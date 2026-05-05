import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.google_client_id);

export const verifyGoogleToken = async (token: string) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.google_client_id!
    })

    const payload = ticket.getPayload();

    return {
        email : payload?.email!,
        name : payload?.name
    }
}