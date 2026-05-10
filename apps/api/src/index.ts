import express from "express";
import { client } from "@repo/store/client"
import { auth } from "google-auth-library";
import router from "./modules/auth/auth.routes.js";
import { runInContext } from "vm";

const app = express();

app.use(express.json());


app.use("/auth", router);



app.listen(3001, () => {
	console.log("running on the port 3001");
})