import { Router } from 'express';
import { getUserInfo, login, logout, register } from '../controllers/auth.js';
import { protectRoute } from '../utils/middleware.js';


const router = Router();


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user", protectRoute, getUserInfo);




export default router;
