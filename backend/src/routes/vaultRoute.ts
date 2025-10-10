import { postEmail, putEmail, removeEmail } from './../controllers/emailController';
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
import { getEmails } from "../controllers/emailController";

const router = Router();

router.use(verifyToken);

// Password entries
router.get('/vault/passwords', getPasswords);
router.post('/vault/passwords', postPassword);
router.put('/vault/passwords/:id', putPassword);
router.delete('/vault/passwords/:id', removePassword);

// Email entries
router.get('/vault/emails', getEmails);
router.post('/vault/emails', postEmail);
router.put('/vault/emails/:id', putEmail);
router.delete('/vault/emails/:id', removeEmail);

// 2FA entries
router.get('/vault/2fa', getTwoFA);
router.post('/vault/2fa', postTwoFA);
router.delete('/vault/2fa/:id', removeTwoFA);

export default router;


