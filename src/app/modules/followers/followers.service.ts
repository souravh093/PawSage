import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TFollowers } from './followers.interface';
import { Followers } from './followers.modal';

const followingIntoDB = async (payload: TFollowers) => {
  const isFollowersExist = await Followers.findOne({
    followerId: payload.followerId,
    userId: payload.userId,
  });

  if (isFollowersExist) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      'You already follow this user',
    );
  }

  const result = await Followers.create(payload);

  return result;
};

const getFollowedUserFromDB = async (userId: string) => {
  const result = await Followers.find({ userId }).populate('followerId');

  return result;
};

const getFollowersFromDB = async (followerId: string) => {
  const result = await Followers.find({ followerId }).populate('userId');

  return result;
};

const unFollowIntoDB = async (payload: TFollowers) => {
  const result = await Followers.deleteOne(payload);

  return result;
};

export const FollowersServices = {
  followingIntoDB,
  getFollowedUserFromDB,
  getFollowersFromDB,
  unFollowIntoDB,
};
