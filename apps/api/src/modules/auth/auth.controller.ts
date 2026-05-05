import { clearRefreshCookie, setRefreshCookies } from "../../lib/cookie.js";
import * as srvc from "./auth.services.js";
import type { Request, Response } from "express"

export const register = async (req: Request , res: Response) => {
    const { email, password } = req.body;

    await srvc.register(email, password);
    res.send("Check email for OTP");
}


export const verifyEmail = async (req: Request, res: Response) => {
    const { email, code } = req.body;

    await srvc.verifyEmail(email, code);

    res.send("Verified Successfully");
}

 
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { refreshToken, accessToken } = await srvc.login(email, password);

    setRefreshCookies(res, refreshToken);

    res.json({
        accessToken
    })
}


export const googleLogin = async (req: Request, res: Response) => {
    const { token } = req.body;

    const { refreshToken, accessToken } = await srvc.googleLogin(token);

    setRefreshCookies(res, refreshToken);

    res.json({
        accessToken
    })
}


export const refresh = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    const { refreshToken, accessToken } = await srvc.refresh(token);

    setRefreshCookies(res, refreshToken);

    res.json({
        accessToken
    })
}

export const logout = (req: Request, res: Response) => {
    clearRefreshCookie(res);

    res.send("Logged out!");
}

export const requestPasswordReset = async (req: Request, res: Response) => {
    const { email } = req.body;

    await srvc.requestPasswordReset(email);

    res.send(`OTP sent to email.`);
}


export const resetPassword = async (req: Request, res: Response) => {
    const { email, code, newPassword } = req.body;
    await srvc.resetPassword(email, code, newPassword);

    res.send("Password has been reset.")
}