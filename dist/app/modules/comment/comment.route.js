"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const comment_validation_1 = require("./comment.validation");
const comment_controller_1 = require("./comment.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(comment_validation_1.CommentValidation.createCommentValidationSchema), comment_controller_1.CommentController.createComment);
router.get('/:postId', comment_controller_1.CommentController.getCommentsByPostId);
router.put('/:id', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(comment_validation_1.CommentValidation.updateCommentValidationSchema), comment_controller_1.CommentController.updateComment);
router.delete('/:id', (0, auth_1.default)('admin', 'user'), comment_controller_1.CommentController.deleteComment);
exports.CommentRoutes = router;
