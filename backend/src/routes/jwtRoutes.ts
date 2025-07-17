import { Router } from "express";
import { checkSession, removeJwt, setJwt } from "../controllers/jwtController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post('/auth/set-jwt', setJwt);
router.post('/auth/remove-jwt', removeJwt);
router.get('/auth/session', verifyToken, checkSession);


export default router;