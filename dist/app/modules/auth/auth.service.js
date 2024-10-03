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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
const sendEmail_1 = require("../../utils/sendEmail");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// sign up user
const signupUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check user have then throw error
    if (yield user_model_1.User.isUserExistsByEmail(payload.email)) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'This email already exists another user');
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
// login user service
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check user are exist
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password not matched');
    }
    const jwtPayload = {
        email: user.email,
        id: user._id,
        role: user.role,
        name: user.name,
        profilePicture: user.profilePicture,
        phone: user.phone,
        premiumMember: user.premiumMember,
    };
    // generate token
    const accessToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        data: user,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    const { userEmail } = decoded;
    const user = yield user_model_1.User.isUserExistsByEmail(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
    }
    const jwtPayload = {
        email: user.email,
        id: user._id,
        role: user.role,
        name: user.name,
        profilePicture: user.profilePicture,
        phone: user.phone,
    };
    const accessToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield user_model_1.User.isUserExistsByEmail(email);
    if (!isExistUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (yield user_model_1.User.isUserDeleted(email)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'User Already Deleted');
    }
    if (yield user_model_1.User.isUserStatus(email)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'User Blocked');
    }
    const jwtPayload = {
        email: isExistUser.email,
        role: isExistUser.role,
    };
    const resetToken = (0, auth_utils_1.generateToken)(jwtPayload, config_1.default.jwt_access_secret, '1h');
    const resetURLLink = `${config_1.default.client_url}?email=${isExistUser.email}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(resetURLLink, email);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield user_model_1.User.findOne({ email: payload.email });
    if (!isExistUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (yield user_model_1.User.isUserDeleted(payload.email)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'User Already Deleted');
    }
    if (yield user_model_1.User.isUserStatus(payload.email)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'User Blocked');
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    if (decoded.email !== payload.email) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized');
    }
    const newHashPassword = yield bcryptjs_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({
        email: decoded.email,
        role: decoded.role,
    }, {
        password: newHashPassword,
        passwordChangedAt: new Date(),
    });
});
const changePassword = (payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield user_model_1.User.isUserExistsByEmail(email);
    if (!isExistUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (yield user_model_1.User.isUserDeleted(email)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'User Already Deleted');
    }
    if (yield user_model_1.User.isUserStatus(email)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'User Blocked');
    }
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.oldPassword, isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password not matched');
    }
    const newHashPassword = yield bcryptjs_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({ email: isExistUser.email, role: isExistUser.role }, { password: newHashPassword, passwordChangedAt: new Date() });
});
exports.AuthService = {
    signupUser,
    loginUser,
    refreshToken,
    forgetPassword,
    resetPassword,
    changePassword,
};
