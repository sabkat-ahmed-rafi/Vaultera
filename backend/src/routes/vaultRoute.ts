import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { 
  getTwoFA, 
  postTwoFA, 
  removeTwoFA
} from "../controllers/twoFAController";
import { 
  getPasswords,
  postPassword, 
  putPassword,
  removePassword,
} from "../controllers/passwordController";

const router = Router();

router.use(verifyToken);

// Password entries
router.get('/vault/passwords', getPasswords);
router.post('/vault/passwords', postPassword);
router.put('/vault/passwords/:id', putPassword);
router.delete('/vault/passwords/:id', removePassword);

// 2FA entries
router.get('/vault/2fa', getTwoFA);
router.post('/vault/2fa', postTwoFA);
router.delete('/vault/2fa/:id', removeTwoFA);

export default router;


