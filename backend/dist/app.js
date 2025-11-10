"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const vaultRoute_1 = __importDefault(require("./routes/vaultRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Middlewares 
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: config_1.config.frontend,
    credentials: true,
}));
// Routes
app.use('/api', authRoute_1.default);
app.use('/api', vaultRoute_1.default);
app.use("/api", userRoute_1.default);
exports.default = app;
