"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register_validation_1 = require("../validations/register.validation");
const validate_1 = require("../validations/validate");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = yield (0, validate_1.validateAsync)(req.body, register_validation_1.registerValidation);
        if (errors) {
            return res.status(400).json(errors);
        }
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
        const user = yield User_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
        res.status(201).json(Object.assign(Object.assign({}, user), { password: undefined }));
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user || !(yield user.checkPassword(password))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.login = login;
