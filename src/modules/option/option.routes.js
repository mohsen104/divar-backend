import { Router } from "express";
import { create, find, findById, findByCategoryId, findByCategorySlug, removeById, update } from './option.controller.js';

const router = Router();

router.post("/", create)
router.get("/", find)
router.get("/:id", findById)
router.get("/by-category/:categoryId", findByCategoryId)
router.get("/by-category-slug/:slug", findByCategorySlug)
router.put("/:id", update)
router.delete("/:id", removeById)

export default router;