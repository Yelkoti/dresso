import { authUser, logoutUser, userRegisteration } from "../controllers/userController.js";
import express from 'express';

const router = express.Router();

router.route('/').post(userRegisteration);
router.route('/logout').post(logoutUser);
router.route('/auth').post(authUser);
router.route('/signup').post(userRegisteration);

export default router;