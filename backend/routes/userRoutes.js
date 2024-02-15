import { authUser, userRegisteration } from "../controllers/userController.js";
import express from 'express';

const router = express.Router();

router.route('/').post(userRegisteration);
router.route('/auth').post(authUser);

export default router;