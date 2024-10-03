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
exports.PostServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const post_modal_1 = require("./post.modal");
const createPostIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_modal_1.Post.create(payload);
    return result;
});
const getPostsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const postQuery = new QueryBuilder_1.default(post_modal_1.Post.find().populate('userId'), query)
        .search(['title', 'content'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield postQuery.modelQuery;
    const meta = yield postQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getSinglePostFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findPost = yield post_modal_1.Post.findById(id);
    if (!findPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Post not found');
    }
    return findPost;
});
const updatePostIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_modal_1.Post.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deletePostFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_modal_1.Post.findByIdAndDelete(id);
    return result;
});
exports.PostServices = {
    createPostIntoDB,
    getPostsFromDB,
    getSinglePostFromDB,
    updatePostIntoDB,
    deletePostFromDB,
};
