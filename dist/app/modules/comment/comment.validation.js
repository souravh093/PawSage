"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidation = void 0;
const zod_1 = require("zod");
const createCommentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string({ required_error: 'Comment is required' }),
        userId: zod_1.z.string({ required_error: 'User ID is required' }),
        postId: zod_1.z.string({ required_error: 'Post ID is required' }),
    }),
});
const updateCommentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        postId: zod_1.z.string().optional(),
    }),
});
exports.CommentValidation = {
    createCommentValidationSchema,
    updateCommentValidationSchema,
};
