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
exports.CommentServices = void 0;
const comment_model_1 = require("./comment.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.create(payload);
    return result;
});
const getCommentsByPostId = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.find({ postId }).populate('userId');
    return result;
});
const updateComment = (payload, id, loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const isCommentUserExist = yield comment_model_1.Comment.findOne({
        userId: loggedUser.id,
        _id: id,
    });
    if (!isCommentUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'You are not the owner of this comment');
    }
    const result = yield comment_model_1.Comment.findOneAndUpdate({
        _id: id,
        userId: loggedUser.id,
    }, { $set: payload }, { new: true });
    return result;
});
const deleteComment = (id, loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.findOneAndDelete({
        _id: id,
        userId: loggedUser.id,
    });
    return result;
});
exports.CommentServices = {
    createComment,
    getCommentsByPostId,
    updateComment,
    deleteComment,
};
