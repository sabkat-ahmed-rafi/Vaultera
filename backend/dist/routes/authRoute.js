"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
// User Authentication
router.post('/auth/sign-up', authController_1.createUser);
router.post('/auth/sign-in', authController_1.loginUser);
router.get('/auth/users/:email/vault-key-info', authController_1.checkUserVaultKeyInfo);
// JWT Session Handling
router.post('/auth/set-jwt', authController_1.setJwt);
router.post('/auth/remove-jwt', authController_1.removeJwt);
router.get('/auth/session', verifyToken_1.verifyToken, authController_1.checkSession);
exports.default = router;
