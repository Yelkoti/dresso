import {
  authUser,
  logoutUser,
  userRegisteration,
} from "../controllers/userController.js";
import express from "express";
import protect from "../middleware/authMiddleWare.js";
import { updateUserDetails } from "../controllers/userController.js";

const router = express.Router();

router.route("/logout").post(logoutUser);
router.route("/auth").post(authUser);
router.route("/signup").post(userRegisteration);
router.route("/:id").post(protect, updateUserDetails);

export default router;
