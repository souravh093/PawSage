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
exports.VoteServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const vote_modal_1 = require("./vote.modal");
const post_modal_1 = require("../post/post.modal");
const upVoteIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isVotedPost = yield vote_modal_1.Vote.findOne({
        postId: payload.postId,
        userId: payload.userId,
    });
    const findPost = yield post_modal_1.Post.findById(payload.postId);
    if (!findPost) {
        throw new AppError_1.default(http_status_1.default.OK, 'Post not found');
    }
    if (isVotedPost) {
        if (isVotedPost.type === 'upvote') {
            throw new AppError_1.default(http_status_1.default.OK, 'You have already upvoted');
        }
        else {
            yield vote_modal_1.Vote.findOneAndDelete({
                postId: payload.postId,
                userId: payload.userId,
            });
            yield post_modal_1.Post.findByIdAndUpdate(payload.postId, { $inc: { likes: 1 } });
            yield new vote_modal_1.Vote(Object.assign(Object.assign({}, payload), { type: 'upvote' })).save();
        }
    }
    else {
        yield new vote_modal_1.Vote(Object.assign(Object.assign({}, payload), { type: 'upvote' })).save();
        yield post_modal_1.Post.findByIdAndUpdate(payload.postId, { $inc: { likes: 1 } });
    }
    return { message: 'Upvoted successfully' };
});
const downVoteIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isVotedPost = yield vote_modal_1.Vote.findOne({
        postId: payload.postId,
        userId: payload.userId,
    });
    const findPost = yield post_modal_1.Post.findById(payload.postId);
    if (!findPost) {
        throw new AppError_1.default(http_status_1.default.OK, 'Post not found');
    }
    if (isVotedPost) {
        if (isVotedPost.type === 'downvote') {
            throw new AppError_1.default(http_status_1.default.OK, 'You have already downvoted');
        }
        else {
            yield vote_modal_1.Vote.findOneAndDelete({
                postId: payload.postId,
                userId: payload.userId,
            });
            yield post_modal_1.Post.findByIdAndUpdate(payload.postId, { $inc: { likes: -1 } });
            yield new vote_modal_1.Vote(Object.assign(Object.assign({}, payload), { type: 'downvote' })).save();
        }
    }
    else {
        yield new vote_modal_1.Vote(Object.assign(Object.assign({}, payload), { type: 'downvote' })).save();
        yield post_modal_1.Post.findByIdAndUpdate(payload.postId, { $inc: { likes: -1 } });
    }
    return { message: 'Downvoted successfully' };
});
exports.VoteServices = {
    upVoteIntoDB,
    downVoteIntoDB,
};
