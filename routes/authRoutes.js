import express from 'express';
import { loginCheck, isAuth, isAdmind } from '../middleware/auth.js'

import {isAdmin,  allUser, postSignin, postSignup} from '../controllers/authController.js'

const router = express.Router();

router.post("/isadmin", isAdmin);
router.post("/signup", postSignup);
router.post("/signin", postSignin);
router.post("/user", loginCheck,  allUser);

export default router;