import { client } from "@repo/store/client"
import { comparePassword, hashPassword, hashToken } from "../../utils/hash.js";
import { generateOtp } from "../../utils/otp.js";
import { sendEmail } from "../../lib/email.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.js";
import { verifyGoogleToken } from "../../lib/oauth.js";
import { otpVerifyTemplate } from "../../shared/templates/otp.template.js";



const createSession = async (userId: string) => {
    const session = await client.session.create({
        data: {
            userId: userId,
            refreshToken: "",
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }
    })

    const refreshToken = generateRefreshToken(session.id);

    await client.session.update({
        where: { id: session.id },
        data: {
        refreshToken: hashToken(refreshToken),
        },
    });

    return {
        id: session.id,
        refreshToken
    }
}


export const register = async (email: string, password: string) => {
    // this is working good
    const user = await client.user.findUnique({
        where: {
            email 
        }
    });

    if(user) throw new Error("User already exists");

    const hash = await hashPassword(password);

    await client.user.create({
        data: {
            email,
            password: hash,
            provider: "local",
        }
    });

    const code = generateOtp();
    

    await client.otp.create({
        data: {
            email: email,
            code,
            type: "verify-email",
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        }
    })

    await sendEmail({to: email, subject: "Verify email", html: otpVerifyTemplate(code)});
}



export const verifyEmail = async (email: string, code: string) => {
    // it is working correctly

    const otp = await client.otp.findFirst({
        where: {
            email,
            code,
            type: "verify-email",
            verified: false
        }
    });

    if (!otp) throw new Error("Invalid OTP");



    if(otp.expiresAt < new Date()){
        // this means otp is now expired so we should send a new otp to the db and email.

        const newCode = generateOtp();

        await client.otp.update({
            where: {
                id: otp.id
            },
            data: {
                code: newCode,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000)
            }
        })


        await sendEmail({to: email, subject: "Verify email", html: otpVerifyTemplate(otp.code)});
        
        throw new Error("OTP is expired. New OTP sent.")
    }


    await client.otp.update({
        where: {
            id: otp.id
        },
        data: {
            verified: true
        }
    })


    await client.user.update({
        where: {
            email: email
        },
        data: {
            isVerified: true
        }
    })


}


export const login = async (email: string, password: string) => {
    const user = await client.user.findFirst({
        where: {
            email
        }
    })

    if(!user || !user.password) throw new Error("Invalid Credentials");

    const validUser = comparePassword(password, user.password);

    if(!validUser) throw new Error("Enter correct password");

    const session = await createSession(user.id);

    return {
        accessToken: generateAccessToken(user.id),
        refreshToken: generateRefreshToken(session.id),
    }
}



export const googleLogin = async (token :string) => {
    const { email, name } = await verifyGoogleToken(token);

    let user = await client.user.findUnique({
        where: {
            email: email
        }
    });

    if(!user) {
        user = await client.user.create({
            data: {
                email: email,
                name: name ?? "",
                provider: "google",
                isVerified: true
            }
        })
    }

    const session = await createSession(user.id);

    return {
        accessToken: generateAccessToken(user.id),
        refreshToken: generateRefreshToken(session.id)
    }
}


export const refresh = async (token: string) => {
    const payload = verifyRefreshToken(token);

    const session = await client.session.findUnique({
        where: {
            id: payload.sessionId 
        }
    })

    if(!session) throw new Error("Invalid session");

    const isValid = session.refreshToken === hashToken(token);

    if(!isValid){
        await client.session.deleteMany({
        where: { userId: session.userId },
        });

        throw new Error("Session compromised. Logged out everywhere.")
    }

    const newRefreshToken = generateRefreshToken(session.id);
    const hashedToken = hashToken(newRefreshToken);

    await client.session.update({
        where: {
            id: session.id
        },
        data: {
            refreshToken: hashedToken
        }
    })

    return {
    accessToken: generateAccessToken(session.userId),
    refreshToken: newRefreshToken
  };

}


export const requestPasswordReset = async (email: string) => {
    const code = generateOtp();

    await client.otp.create({
        data: {
            email,
            code,
            type: "reset_password",
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        }
    })

    await sendEmail({to: email, subject: "Reset Password", html: `OTP: ${code}`});
}


export const resetPassword = async(email: string, code: string, newPassword: string) => {

    const otp = await client.otp.findFirst({
        where: { email, code, type: "reset_password", verified: false },
    });

    if (!otp || otp.expiresAt < new Date()){
        console.log("Invalid OTP");
        return;
    }


    await client.otp.update({
        where: {
            id: otp.id
        },
        data: { 
            verified: true 
        },
    });

    const hashedPass = await hashPassword(newPassword);

    await client.user.update({
        where: {
            email:  email
        },
        data: { 
            password: hashedPass 
        },
    });

}