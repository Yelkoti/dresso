import express from 'express';
import protect from "../middleware/authMiddleWare.js";
import {addPantDetails} from "../controllers/pantController.js"

const router = express.Router();

router.route('/').post(protect, addPantDetails);

export default router;