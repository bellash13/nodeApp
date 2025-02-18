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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAsync = void 0;
const validateAsync = (body_1, schema_1, ...args_1) => __awaiter(void 0, [body_1, schema_1, ...args_1], void 0, function* (body, schema, abortEarly = true) {
    const { error } = yield schema.validateAsync(body, { abortEarly });
    const errors = ((error === null || error === void 0 ? void 0 : error.details) || []).map((err) => ({
        field: err.path.join("."),
        message: err.message
    }));
    return errors;
});
exports.validateAsync = validateAsync;
