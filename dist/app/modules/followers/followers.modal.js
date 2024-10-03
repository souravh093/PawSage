"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Followers = void 0;
const mongoose_1 = require("mongoose");
const followersModal = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    followerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, { timestamps: true });
exports.Followers = (0, mongoose_1.model)('Followers', followersModal);
