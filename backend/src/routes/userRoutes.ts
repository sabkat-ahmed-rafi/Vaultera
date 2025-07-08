import { Router } from "express";
import { createUser, getUser } from "../controllers/userController";

const router = Router();

router.post('/sign-up', createUser);
router.get('/sign-in', getUser);


export default router;