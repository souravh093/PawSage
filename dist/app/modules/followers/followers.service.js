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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowersServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const followers_modal_1 = require("./followers.modal");
const post_modal_1 = require("../post/post.modal");
const followingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isFollowersExist = yield followers_modal_1.Followers.findOne({
        followerId: payload.followerId,
        userId: payload.userId,
    });
    if (isFollowersExist) {
        throw new AppError_1.default(http_status_1.default.ALREADY_REPORTED, 'You already follow this user');
    }
    const result = yield followers_modal_1.Followers.create(payload);
    return result;
});
const isFollowingIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield followers_modal_1.Followers.findOne({
        userId: query.userId,
        followerId: query.followerId,
    });
    return result;
});
const getFollowerAndFollowingCount = (loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const followerCount = yield followers_modal_1.Followers.countDocuments({
        userId: loggedUser.id,
    });
    const followingCount = yield followers_modal_1.Followers.countDocuments({
        followerId: loggedUser.id,
    });
    return { followerCount, followingCount };
});
const getFollowedUserFromDB = (loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const followedUsers = yield followers_modal_1.Followers.find({
        followerId: loggedUser.id,
    }).populate('userId');
    if (!followedUsers || followedUsers.length === 0) {
        throw new AppError_1.default(http_status_1.default.OK, 'No followed users found');
    }
    const allPosts = [];
    for (const followedUser of followedUsers) {
        const posts = yield post_modal_1.Post.find({
            userId: followedUser.userId._id,
        }).populate('userId');
        allPosts.push(...posts);
    }
    return allPosts;
});
const getFollowersFromDB = (loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield followers_modal_1.Followers.find({ userId: loggedUser.id }).populate('followerId');
    return result;
});
const followedUserFromDB = (loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield followers_modal_1.Followers.find({ followerId: loggedUser.id }).populate('userId');
    return result;
});
const unFollowIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield followers_modal_1.Followers.deleteOne({
        followerId: query.id,
    });
    return result;
});
exports.FollowersServices = {
    followingIntoDB,
    getFollowedUserFromDB,
    getFollowersFromDB,
    unFollowIntoDB,
    isFollowingIntoDB,
    getFollowerAndFollowingCount,
    followedUserFromDB,
};
