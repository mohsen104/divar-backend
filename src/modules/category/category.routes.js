import { Router } from "express";
import { create, find, remove } from './category.controller.js';

const router = Router();

router.post("/", create)
router.delete("/:id", remove)
router.get("/", find)

export default router;