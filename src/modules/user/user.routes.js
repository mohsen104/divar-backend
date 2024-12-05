import { Router } from "express";
import { whoami } from "./user.controller.js";
import Authorization from '../../common/guard/authorization.guard.js';

const router = Router();

router.get("/whoami", Authorization, whoami)

export default router;