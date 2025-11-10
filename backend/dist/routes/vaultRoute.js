"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const emailController_1 = require("./../controllers/emailController");
const twoFAController_1 = require("../controllers/twoFAController");
const passwordController_1 = require("../controllers/passwordController");
const noteController_1 = require("../controllers/noteController");
const cardController_1 = require("../controllers/cardController");
const bankAccountController_1 = require("../controllers/bankAccountController");
const identityController_1 = require("../controllers/identityController");
const router = (0, express_1.Router)();
router.use(verifyToken_1.verifyToken);
// Password entries
router.get('/vault/passwords', passwordController_1.getPasswords);
router.post('/vault/passwords', passwordController_1.postPassword);
router.put('/vault/passwords/:id', passwordController_1.putPassword);
router.delete('/vault/passwords/:id', passwordController_1.removePassword);
// Email entries
router.get('/vault/emails', emailController_1.getEmails);
router.post('/vault/emails', emailController_1.postEmail);
router.put('/vault/emails/:id', emailController_1.putEmail);
router.delete('/vault/emails/:id', emailController_1.removeEmail);
// 2FA entries
router.get('/vault/2fa', twoFAController_1.getTwoFA);
router.post('/vault/2fa', twoFAController_1.postTwoFA);
router.delete('/vault/2fa/:id', twoFAController_1.removeTwoFA);
// Note entries
router.get('/vault/notes', noteController_1.getNotes);
router.post('/vault/notes', noteController_1.postNote);
router.put('/vault/notes/:id', noteController_1.putNote);
router.delete('/vault/notes/:id', noteController_1.removeNote);
// Card entries
router.get('/vault/cards', cardController_1.getCards);
router.post('/vault/cards', cardController_1.postCard);
router.put('/vault/cards/:id', cardController_1.putCard);
router.delete('/vault/cards/:id', cardController_1.removeCard);
// Bank Account entries
router.get('/vault/bank-accounts', bankAccountController_1.getBankAccounts);
router.post('/vault/bank-accounts', bankAccountController_1.postBankAccount);
router.put('/vault/bank-accounts/:id', bankAccountController_1.putBankAccount);
router.delete('/vault/bank-accounts/:id', bankAccountController_1.removeBankAccount);
// Identity entries
router.get('/vault/identities', identityController_1.getIdentities);
router.post('/vault/identities', identityController_1.postIdentity);
router.put('/vault/identities/:id', identityController_1.putIdentity);
router.delete('/vault/identities/:id', identityController_1.removeIdentity);
exports.default = router;
