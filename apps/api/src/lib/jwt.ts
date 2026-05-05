import jwt from "jsonwebtoken";


export const generateRefreshToken = (userId: string) => {
	return jwt.sign({
		userId
	}, process.env.refresh_secret!,
	{ expiresIn: "7d" });
}


export const generateAccessToken = (userId: string) => {
	return jwt.sign({
		userId
	}, process.env.access_secret!,
	{ expiresIn: "15m" });
}


export const verifyAccessToken = (token: string) => {
	return jwt.verify(token, process.env.access_token!) as {
		userId: string
	}
}


export const verifyRefreshToken = (token: string) => {
	return jwt.verify(token, process.env.refresh_token!) as {
		sessionId: string
	}
}