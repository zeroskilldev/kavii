import type { Request, Response, NextFunction } from "express"
import { verifyAccessToken } from "../../lib/jwt.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;

    if(!auth) return res.status(401).send("No token");

    const token = auth.split(" ")[1];

    if(!token) return res.status(401).send("No token");

    try{
        const payload = verifyAccessToken(token);

        req.user = payload.userId;

        next();
    }catch{
        return res.status(401).send("Invalid token");
    }
}