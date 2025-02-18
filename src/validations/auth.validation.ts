import Joi from "joi";

export const registerValidation = Joi.object({
  name: Joi.string()
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

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format.",
      "string.empty": "Email is required.",
      "any.required": "Email is required."
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least {#limit} characters long.",
      "string.empty": "Password is required.",
      "any.required": "Password is required."
    })
}); 

export const loginValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format.",
      "string.empty": "Email is required.",
      "any.required": "Email is required."
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required."
    })
}); 