import type { Response } from "express"

export const setRefreshCookies = (res : Response, token: string) => {
   
    res.cookie("refreshCookie", token, {
        "httpOnly" : true,                                      // cannot be accessed through browser via document.cookie
        // "secure" : true,                                     // accessed through https only
        "sameSite" : "lax",
        "maxAge" : 7 * 24 * 60 * 60 * 1000,
    });
}



export const clearRefreshCookie = (res: Response) => {
    res.clearCookie("refreshCookie");
}