import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FriendService } from './friend.service';

const sendFriendRequest = catchAsync(async (req, res) => {
  const result = await FriendService.sendFriendRequestToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Friend request sent successfully',
    data: result,
  });
});

const cancelFriendRequest = catchAsync(async (req, res) => {
  const result = await FriendService.cancelFriendRequestFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Friend request cancelled successfully',
    data: result,
  });
});

const acceptedFriend = catchAsync(async (req, res) => {
  const result = await FriendService.acceptedFriendFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Friend request accepted successfully',
    data: result,
  });
});

const getFriendRequest = catchAsync(async (req, res) => {
  const result = await FriendService.getFriendRequestFromDB(req.params.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Friend request retrieved successfully',
    data: result,
  });
});

const getFriendList = catchAsync(async (req, res) => {
  const result = await FriendService.getFriendListFromDB(req.params.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Friend list retrieved successfully',
    data: result,
  });
});

const checkFriendRequestStatus = catchAsync(async (req, res) => {
  const result = await FriendService.checkFriendRequestStatus(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Friend request status checked successfully',
    data: result,
  });
});

const rejectedFriend = catchAsync(async (req, res) => {
  const result = await FriendService.rejectedFriendFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Friend request rejected successfully',
    data: result,
  });
});

export const FriendController = {
  acceptedFriend,
  getFriendList,
  rejectedFriend,
  sendFriendRequest,
  cancelFriendRequest,
  getFriendRequest,
  checkFriendRequestStatus,
};
