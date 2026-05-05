import express from "express";
import { client } from "@repo/store/client"
import { auth } from "google-auth-library";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hi there");
})

// app.use("/api/auth",)

app.listen(3001, () => {
	console.log("running on the port 3001");
})