import { Router } from "express";
import { removeJwt, setJwt } from "../controllers/jwtController";

const router = Router();

router.post('/set-jwt', setJwt);
router.post('/remove-jwt', removeJwt);


export default router;