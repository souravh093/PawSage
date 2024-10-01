/* eslint-disable @typescript-eslint/no-explicit-any */
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

const isFollowingIntoDB = async (query: Record<string, any>) => {
  const result = await Followers.findOne({
    userId: query.userId,
    followerId: query.followerId,
  });

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

const unFollowIntoDB = async (query: Record<string, any>) => {
  const result = await Followers.deleteOne({
    followerId: query.id,
  });

  return result;
};

export const FollowersServices = {
  followingIntoDB,
  getFollowedUserFromDB,
  getFollowersFromDB,
  unFollowIntoDB,
  isFollowingIntoDB,
};
