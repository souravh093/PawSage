"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const post_controller_1 = require("./post.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const post_validation_1 = require("./post.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(post_validation_1.PostValidation.createPostValidationSchema), post_controller_1.PostController.createPost);
router.get('/', post_controller_1.PostController.getPosts);
router.get('/:id', post_controller_1.PostController.getSinglePost);
router.put('/:id', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(post_validation_1.PostValidation.updatePostValidationSchema), post_controller_1.PostController.updatePost);
router.delete('/:id', (0, auth_1.default)('admin', 'user'), post_controller_1.PostController.deletePost);
exports.PostRoutes = router;
