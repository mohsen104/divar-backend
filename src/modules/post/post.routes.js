import { Router } from "express";
import { postPage, create, myPosts, remove, showPost, postAll } from './post.controller.js';
import upload from "../../common/utils/multer.js";
import Authorization from "../../common/guard/authorization.guard.js";

const router = Router();

router.post("/create", Authorization, upload.array("images", 10), create);
router.delete("/:id", Authorization, remove);

// render
router.get("/post", Authorization, postPage)
router.get("/my", Authorization, myPosts)
router.get("/all", Authorization, postAll);
router.get("/:id", Authorization, showPost);

export default router;