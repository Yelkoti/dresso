import { addShirtDetails } from "../controllers/shirtController.js";
import protect from "../middleware/authMiddleWare.js";
import express from "express";

const router = express.Router();

router.route("/").post(protect, addShirtDetails);
// router.route('/').get(protect, getAllShirtDetails);
// router.route('/:id').put(protect, updateShirtDetails).get(protect, getShirtDetails).delete(protect, deleteShirtDetails);

export default router;
