import { Router } from "express";
import { checkUserVaultKeyInfo, createUser, loginUser } from "../controllers/userController";
import { checkSession, removeJwt, setJwt } from "../controllers/jwtController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

// User Authentication
router.post('/auth/sign-up', createUser);
router.post('/auth/sign-in', loginUser);
router.get('/auth/users/:email/vault-key-info', checkUserVaultKeyInfo);

// JWT Session Handling
router.post('/auth/set-jwt', setJwt);
router.post('/auth/remove-jwt', removeJwt);
router.get('/auth/session', verifyToken, checkSession);

export default router;
