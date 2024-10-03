"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteValidation = void 0;
const zod_1 = require("zod");
const voteValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'User ID is required' }),
        postId: zod_1.z.string({ required_error: 'Post ID is required' }),
    }),
});
exports.VoteValidation = {
    voteValidationSchema,
};
