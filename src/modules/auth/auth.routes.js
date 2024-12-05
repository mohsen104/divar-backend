import { Router } from "express";
import { checkOTP, sendOTP, logout } from "./auth.controller.js";
import Authorization from '../../common/guard/authorization.guard.js'

const router = Router();

router.post("/send-otp", sendOTP)
router.post("/check-otp", checkOTP)
router.get("/logout", Authorization, logout)

export default router;