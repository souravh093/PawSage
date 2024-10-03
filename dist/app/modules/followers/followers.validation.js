"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowersValidations = void 0;
const zod_1 = require("zod");
const followersValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'userId is required' }),
        followerId: zod_1.z.string({ required_error: 'followerId is required' }),
    }),
});
exports.FollowersValidations = {
    followersValidationSchema,
};
