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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendService = void 0;
const friend_modal_1 = require("./friend.modal");
const sendFriendRequestToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isRequestSend = yield friend_modal_1.Friend.findOne({
        userId: payload.userId,
        friendId: payload.friendId,
    });
    if (isRequestSend) {
        throw new Error('Friend request already sent');
    }
    const friendRequestData = {
        userId: payload.userId,
        friendId: payload.friendId,
        status: 'pending',
    };
    const result = yield friend_modal_1.Friend.create(friendRequestData);
    return result;
});
const cancelFriendRequestFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield friend_modal_1.Friend.deleteOne({
        userId: payload.userId,
        friendId: payload.friendId,
    });
    return result;
});
const acceptedFriendFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield friend_modal_1.Friend.findOneAndUpdate({
        userId: payload.friendId,
        friendId: payload.userId,
    }, {
        status: 'accepted',
    });
    return result;
});
const getFriendListFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield friend_modal_1.Friend.find({
        friendId: userId,
        status: 'accepted',
    }).populate('userId');
    return friends;
});
const getFriendRequestFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield friend_modal_1.Friend.find({
        friendId: userId,
        status: 'pending',
    }).populate('friendId').populate('userId');
    return friends;
});
const rejectedFriendFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const friendRequestData = {
        userId: payload.userId,
        friendId: payload.friendId,
        status: 'rejected',
    };
    const result = yield friend_modal_1.Friend.create(friendRequestData);
    return result;
});
const checkFriendRequestStatus = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const friend = yield friend_modal_1.Friend.findOne({
        userId: query.userId,
        friendId: query.friendId,
        status: "pending"
    });
    return friend;
});
exports.FriendService = {
    acceptedFriendFromDB,
    getFriendListFromDB,
    checkFriendRequestStatus,
    rejectedFriendFromDB,
    sendFriendRequestToDB,
    cancelFriendRequestFromDB,
    getFriendRequestFromDB,
};
