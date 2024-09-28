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

const getFollowers = catchAsync(async (req, res) => {
  const result = await FollowersServices.getFollowersFromDB(req.params.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get followers successfully',
    data: result,
  });
});

const unFollow = catchAsync(async (req, res) => {
  const result = await FollowersServices.unFollowIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Unfollow successfully',
    data: result,
  });
});

export const FollowersController = {
  following,
  getFollowers,
  unFollow,
};
