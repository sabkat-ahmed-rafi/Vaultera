import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { 
  postEmail, 
  putEmail, 
  removeEmail, 
  getEmails 
} from './../controllers/emailController';

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

import { 
  getNotes, 
  postNote, 
  putNote, 
  removeNote
} from '../controllers/noteController';

import { 
  getCards, 
  postCard, 
  putCard, 
  removeCard 
} from "../controllers/cardController";

import { 
  getBankAccounts, 
  postBankAccount, 
  putBankAccount, 
  removeBankAccount 
} from "../controllers/bankAccountController";

import { 
  getIdentities, 
  postIdentity, 
  putIdentity, 
  removeIdentity 
} from "../controllers/identityController";

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

// Note entries
router.get('/vault/notes', getNotes);
router.post('/vault/notes', postNote);
router.put('/vault/notes/:id', putNote);
router.delete('/vault/notes/:id', removeNote);

// Card entries
router.get('/vault/cards', getCards);
router.post('/vault/cards', postCard);
router.put('/vault/cards/:id', putCard);
router.delete('/vault/cards/:id', removeCard);

// Bank Account entries
router.get('/vault/bank-accounts', getBankAccounts);
router.post('/vault/bank-accounts', postBankAccount);
router.put('/vault/bank-accounts/:id', putBankAccount);
router.delete('/vault/bank-accounts/:id', removeBankAccount);

// Identity entries
router.get('/vault/identities', getIdentities);
router.post('/vault/identities', postIdentity);
router.put('/vault/identities/:id', putIdentity);
router.delete('/vault/identities/:id', removeIdentity);



export default router;




