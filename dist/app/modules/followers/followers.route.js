"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowersRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const followers_validation_1 = require("./followers.validation");
const followers_controller_1 = require("./followers.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin', 'user'), (0, validateRequest_1.default)(followers_validation_1.FollowersValidations.followersValidationSchema), followers_controller_1.FollowersController.following);
router.get('/checkFollow', followers_controller_1.FollowersController.isFollowing);
router.get('/me', (0, auth_1.default)('admin', 'user'), followers_controller_1.FollowersController.getFollowedUser);
router.get('/count', (0, auth_1.default)('admin', 'user'), followers_controller_1.FollowersController.followerAndFollowingCount);
router.get('/:followerId', (0, auth_1.default)('admin', 'user'), followers_controller_1.FollowersController.getFollowers);
router.delete('/', (0, auth_1.default)('admin', 'user'), followers_controller_1.FollowersController.unFollow);
exports.FollowersRoutes = router;
