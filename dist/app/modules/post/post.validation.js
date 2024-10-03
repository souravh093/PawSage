"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidation = void 0;
const zod_1 = require("zod");
const createPostValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        thumbnail: zod_1.z.string({ required_error: 'Thumbnail is required' }),
        category: zod_1.z.enum(['Tip', 'Story']),
        content: zod_1.z.string({ required_error: 'Content is required' }),
        userId: zod_1.z.string({ required_error: 'User ID is required' }),
        isPremium: zod_1.z.boolean().optional(),
    }),
});
const updatePostValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        thumbnail: zod_1.z.string().optional(),
        category: zod_1.z.enum(['Tip', 'Story']).optional(),
        content: zod_1.z.string().optional(),
        likes: zod_1.z.number().optional(),
        userId: zod_1.z.string().optional(),
        isPremium: zod_1.z.boolean().optional(),
    }),
});
exports.PostValidation = {
    createPostValidationSchema,
    updatePostValidationSchema,
};
