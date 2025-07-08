import { createUser } from "../controller/userController";
import express from "express";


const router = express.Router();

router.post('/sign-up', createUser);


export default router;