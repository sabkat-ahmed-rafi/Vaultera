import { Router } from "express";
import { createUser } from "../controllers/userController";

const router = Router();

router.post('/sign-up', createUser);


export default router;