import { Router } from "express";
import { checkSession, removeJwt, setJwt } from "../controllers/jwtController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post('/set-jwt', setJwt);
router.post('/remove-jwt', removeJwt);
router.get('/session', verifyToken, checkSession)


export default router;