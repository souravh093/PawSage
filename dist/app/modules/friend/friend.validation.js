"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendValidations = void 0;
const zod_1 = require("zod");
const friendValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        friendId: zod_1.z.string({ required_error: 'friendId is required' }),
        userId: zod_1.z.string({ required_error: 'userId is required' }),
    }),
});
exports.FriendValidations = {
    friendValidationSchema,
};
