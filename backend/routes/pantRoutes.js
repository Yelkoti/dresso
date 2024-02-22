import express from "express";
import protect from "../middleware/authMiddleWare.js";
import { addPantDetails, getAllPantDetails, updatePantDetails, getPantDetails } from "../controllers/pantController.js";

const router = express.Router();

router.route("/").post(protect, addPantDetails);
router.route('/').get(protect, getAllPantDetails);
router.route('/:id').put(protect, updatePantDetails).get(protect, getPantDetails);

export default router;
