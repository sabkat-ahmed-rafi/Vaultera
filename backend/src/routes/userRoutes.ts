import { Router } from "express";
import { checkUserVaultKeyInfo, createUser, loginUser } from "../controllers/userController";

const router = Router();

router.post('/sign-up', createUser);
router.post('/sign-in', loginUser);
router.get('/users/:email/vault-key-info', checkUserVaultKeyInfo);


export default router;