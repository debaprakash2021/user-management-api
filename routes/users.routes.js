import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  patchUser,
  isActive,
  updateUserByEmail,
  deleteUserByEmail,
  createPost,
  getPost
} from "../controllers/user.controller.js";


import {checkAuth , validateUserId ,validateZod} from "../middlewares/auth.js"
import { validateCreateUserDTO } from "../dtos/user.dto.js";
import { createUserSchema, updateUserSchema } from "../dtos/user.zod.js";
// import { validateZod } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/gets",getPost);
router.post("/", createUser);
router.post("/post",createPost);
router.get("/isactive",isActive);
router.patch("/byEmail", updateUserByEmail);
router.patch("/:id", updateUser);
router.delete("/byEmailDelete",deleteUserByEmail);
router.delete("/:id", deleteUser);

export default router;