"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerValidation = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(30)
        .required()
        .messages({
        "string.base": "Name must be a string.",
        "string.empty": "Name is required.",
        "string.min": "Name must be at least {#limit} characters long.",
        "string.max": "Name must not exceed {#limit} characters.",
        "any.required": "Name is required."
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        "string.email": "Invalid email format.",
        "string.empty": "Email is required.",
        "any.required": "Email is required."
    }),
    password: joi_1.default.string()
        .min(6)
        .required()
        .messages({
        "string.min": "Password must be at least {#limit} characters long.",
        "string.empty": "Password is required.",
        "any.required": "Password is required."
    })
});
