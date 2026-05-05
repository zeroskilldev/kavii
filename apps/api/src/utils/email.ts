import nodemailer from "nodemailer";

export const sendEmail = async (email: string, type: string, body: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            
        }
    })
}