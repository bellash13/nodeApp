import Joi from "joi";
import j2s from "joi-to-swagger";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Convert Joi schema to OpenAPI format
export const { swagger: userSwaggerSchema } = j2s(userSchema);
