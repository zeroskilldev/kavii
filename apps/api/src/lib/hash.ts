import bcrypt from "bcrypt";
import { createHash } from "crypto";


export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
}


export const comparePassword = (password: string, hashedPass: string) => {
    return bcrypt.compare(password, hashedPass);
}


export const hashToken = (token: string) => {
    return createHash('sha256').update(token).digest('hex');
}