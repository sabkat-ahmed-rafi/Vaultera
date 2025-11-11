import { Router } from "express";
import { 
    checkUserVaultKeyInfo,
    createUser,
    loginUser,
    checkSession,
    removeJwt,
    setJwt 
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

// User Authentication
router.post('/sign-up', createUser);
router.post('/sign-in', loginUser);
router.get('/users/:email/vault-key-info', checkUserVaultKeyInfo);

// JWT Session Handling
router.post('/set-jwt', setJwt);
router.post('/remove-jwt', removeJwt);
router.get('/session', verifyToken, checkSession);

export default router;
