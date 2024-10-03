"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const vote_controller_1 = require("./vote.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const vote_validation_1 = require("./vote.validation");
const router = (0, express_1.Router)();
router.post('/upvote', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(vote_validation_1.VoteValidation.voteValidationSchema), vote_controller_1.VoteController.upVoted);
router.post('/downvote', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(vote_validation_1.VoteValidation.voteValidationSchema), vote_controller_1.VoteController.downVoted);
exports.VoteRoutes = router;
