import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { 
  postEmail, 
  putEmail, 
  removeEmail, 
  getEmails 
} from './../controllers/emailController.js';

import { 
  getTwoFA, 
  postTwoFA, 
  removeTwoFA
} from "../controllers/twoFAController.js";

import { 
  getPasswords,
  postPassword, 
  putPassword,
  removePassword,
} from "../controllers/passwordController.js";

import { 
  getNotes, 
  postNote, 
  putNote, 
  removeNote
} from '../controllers/noteController.js';

import { 
  getCards, 
  postCard, 
  putCard, 
  removeCard 
} from "../controllers/cardController.js";

import { 
  getBankAccounts, 
  postBankAccount, 
  putBankAccount, 
  removeBankAccount 
} from "../controllers/bankAccountController.js";

import { 
  getIdentities, 
  postIdentity, 
  putIdentity, 
  removeIdentity 
} from "../controllers/identityController.js";

const router = Router();

router.use(verifyToken);

// Password entries
router.get('/passwords', getPasswords);
router.post('/passwords', postPassword);
router.put('/passwords/:id', putPassword);
router.delete('/passwords/:id', removePassword);

// Email entries
router.get('/emails', getEmails);
router.post('/emails', postEmail);
router.put('/emails/:id', putEmail);
router.delete('/emails/:id', removeEmail);

// 2FA entries
router.get('/2fa', getTwoFA);
router.post('/2fa', postTwoFA);
router.delete('/2fa/:id', removeTwoFA);

// Note entries
router.get('/notes', getNotes);
router.post('/notes', postNote);
router.put('/notes/:id', putNote);
router.delete('/notes/:id', removeNote);

// Card entries
router.get('/cards', getCards);
router.post('/cards', postCard);
router.put('/cards/:id', putCard);
router.delete('/cards/:id', removeCard);

// Bank Account entries
router.get('/bank-accounts', getBankAccounts);
router.post('/bank-accounts', postBankAccount);
router.put('/bank-accounts/:id', putBankAccount);
router.delete('/bank-accounts/:id', removeBankAccount);

// Identity entries
router.get('/identities', getIdentities);
router.post('/identities', postIdentity);
router.put('/identities/:id', putIdentity);
router.delete('/identities/:id', removeIdentity);



export default router;




