import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FollowersServices } from './followers.service';

const following = catchAsync(async (req, res) => {
  const result = await FollowersServices.followingIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Following successfully',
    data: result,
  });
});

const getFollowedUser = catchAsync(async (req, res) => {
  const result = await FollowersServices.getFollowedUserFromDB(
    req.params.userId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get followed user successfully',
    data: result,
  });
});

const getFollowers = catchAsync(async (req, res) => {
  const result = await FollowersServices.getFollowedUserFromDB(
    req.params.followerId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get followers successfully',
    data: result,
  });
});



const isFollowing = catchAsync(async (req, res) => {
  const result = await FollowersServices.isFollowingIntoDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Fetch following",
    data: result,
  })
});

const unFollow = catchAsync(async (req, res) => {
  const result = await FollowersServices.unFollowIntoDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Unfollow successfully',
    data: result,
  });
});

export const FollowersController = {
  following,
  getFollowedUser,
  getFollowers,
  unFollow,
  isFollowing,
};
