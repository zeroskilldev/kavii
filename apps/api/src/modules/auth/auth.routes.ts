import * as ctlr from "./auth.controller.js";
import express, { Router } from "express";

const router: Router = express.Router();

router.post("/register", ctlr.register);
router.post("/verify-email", ctlr.verifyEmail);
router.post("/login", ctlr.login);
router.post("/google-login", ctlr.googleLogin);
router.post("/refresh", ctlr.refresh);
router.post("/logout", ctlr.logout);
router.post("/request-reset", ctlr.requestPasswordReset);
router.post("/reset-password", ctlr.resetPassword);


export default router;
