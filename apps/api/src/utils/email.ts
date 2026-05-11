import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
        service: "gmail",
        
        auth: {
            user: process.env.email_user,
            pass: process.env.email_pass
        }
    });



interface emailOptions {
    to : string,
    subject: string,
    html: string
}


export const sendEmail = async ({
    to, subject, html
}: emailOptions) => {
    
    try{
        const info = await transporter.sendMail({
            from: process.env.email_user,
            to,
            subject,
            html
        })

        console.log("Email sent successfully : ", info.messageId);

        return info;
    }
    catch(e){
        console.error("Email error:", e);
        throw new Error("Failed to send email");
    }

}
