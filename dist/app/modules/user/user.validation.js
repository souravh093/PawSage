"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
// create user validation using zod
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(2, { message: 'Password need more than 2 characters' })
            .max(20, 'Password need less than 20 characters'),
        phone: zod_1.z.string({ required_error: 'Phone number is required' }),
        address: zod_1.z.string({ required_error: 'Address is required' }),
        profilePicture: zod_1.z
            .string({ required_error: 'Profile Picture is required' })
            .url()
            .optional(),
        gender: zod_1.z.string().optional(),
        role: zod_1.z.enum(['admin', 'user']).optional(),
    }),
});
// update user validation using zod
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).optional(),
        email: zod_1.z.string({ required_error: 'Email is required' }).email().optional(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(2, { message: 'Password need more than 2 characters' })
            .max(20, 'Password need less than 20 characters')
            .optional(),
        phone: zod_1.z.string({ required_error: 'Phone number is required' }).optional(),
        address: zod_1.z.string({ required_error: 'Address is required' }).optional(),
        profilePicture: zod_1.z.string().url().optional(),
        bio: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        transactionId: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional(),
        premiumMember: zod_1.z.boolean().optional(),
        passwordChangedAt: zod_1.z.date().optional(),
        status: zod_1.z.enum(['in-progress', 'blocked']).optional(),
        role: zod_1.z.string({ required_error: 'Role is required' }).optional(),
    }),
});
// login user validation using zod
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is Required' }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
const updateRoleValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.string({ required_error: 'Role is Required' }),
    }),
});
exports.UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
    loginUserValidationSchema,
    refreshTokenValidationSchema,
    updateRoleValidationSchema,
};
