import Joi from "joi";

export const validateAsync = async (body: any, schema: Joi.ObjectSchema<any>, abortEarly = true) => {
    const { error } = await schema.validateAsync(body, { abortEarly });

    const errors = (error?.details || []).map((err: any) => ({
        field: err.path.join("."),
        message: err.message
    }));
    return errors;
}