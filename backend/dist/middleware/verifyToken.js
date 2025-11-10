"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const config_1 = require("../config/config");
const jose_1 = require("jose");
const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Token missing" });
            return;
        }
        ;
        const secret = new TextEncoder().encode(config_1.config.jwt_secret);
        const { payload } = await (0, jose_1.jwtVerify)(token, secret);
        req.user = payload;
        next();
    }
    catch (error) {
        if (error.name === "JWTExpired") {
            res.status(401).json({ error: "sessionExpired" });
            return;
        }
        res.status(401).json({ message: "unauthorized access" });
    }
};
exports.verifyToken = verifyToken;
