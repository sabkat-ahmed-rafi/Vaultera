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


// Password entries
router.get('/vault/passwords', verifyToken, getPasswords);
router.post('/vault/passwords', verifyToken, postPassword);
router.put('/vault/passwords/:id', verifyToken, putPassword);
router.delete('/vault/passwords/:id', verifyToken, removePassword);

// Email entries
router.get('/vault/emails', verifyToken, getEmails);
router.post('/vault/emails', verifyToken, postEmail);
router.put('/vault/emails/:id', verifyToken, putEmail);
router.delete('/vault/emails/:id', verifyToken, removeEmail);

// 2FA entries
router.get('/vault/2fa', verifyToken, getTwoFA);
router.post('/vault/2fa', verifyToken, postTwoFA);
router.delete('/vault/2fa/:id', verifyToken, removeTwoFA);

// Note entries
router.get('/vault/notes', verifyToken, getNotes);
router.post('/vault/notes', verifyToken, postNote);
router.put('/vault/notes/:id', verifyToken, putNote);
router.delete('/vault/notes/:id', verifyToken, removeNote);

// Card entries
router.get('/vault/cards', verifyToken, getCards);
router.post('/vault/cards', verifyToken, postCard);
router.put('/vault/cards/:id', verifyToken, putCard);
router.delete('/vault/cards/:id', verifyToken, removeCard);

// Bank Account entries
router.get('/vault/bank-accounts', verifyToken, getBankAccounts);
router.post('/vault/bank-accounts', verifyToken, postBankAccount);
router.put('/vault/bank-accounts/:id', verifyToken, putBankAccount);
router.delete('/vault/bank-accounts/:id', verifyToken, removeBankAccount);

// Identity entries
router.get('/vault/identities', verifyToken, getIdentities);
router.post('/vault/identities', verifyToken, postIdentity);
router.put('/vault/identities/:id', verifyToken, putIdentity);
router.delete('/vault/identities/:id', verifyToken, removeIdentity);



export default router;




