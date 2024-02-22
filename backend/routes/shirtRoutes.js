import express from "express";
import protect from "../middleware/authMiddleWare.js";
import { addShirtDetails, getAllShirtDetails, updateShirtDetails, getShirtDetails } from "../controllers/shirtController.js";

const router = express.Router();

router.route("/").post(protect, addShirtDetails);
router.route('/').get(protect, getAllShirtDetails);
router.route('/:id').put(protect, updateShirtDetails).get(protect, getShirtDetails);
// .get(protect, getShirtDetails).delete(protect, deleteShirtDetails);

export default router;
