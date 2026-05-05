import express from "express";
import { client } from "@repo/store/client"

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hi there");
})

app.post("/signup", async (req, res) => {
	const { username, password } = req.body;

	const user = await client.user.create({
		data: {
			username,
			password
		}
	})

	res.json({
		msg: "successfully signed up",
		id: user.id
	})
})


app.listen(3001, () => {
	console.log("running on the port 3001");
})