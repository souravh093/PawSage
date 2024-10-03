"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidation = void 0;
const zod_1 = require("zod");
const paymentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.string({ required_error: 'Amount is required' }),
    }),
});
exports.PaymentValidation = {
    paymentValidationSchema,
};
