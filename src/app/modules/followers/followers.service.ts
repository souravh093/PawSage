/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TFollowers } from './followers.interface';
import { Followers } from './followers.modal';
import { JwtPayload } from 'jsonwebtoken';
import { Post } from '../post/post.modal';

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

const getFollowerAndFollowingCount = async (loggedUser: JwtPayload) => {
  const followerCount = await Followers.countDocuments({
    userId: loggedUser.id,
  });
  const followingCount = await Followers.countDocuments({
    followerId: loggedUser.id,
  });

  return { followerCount, followingCount };
};

const getFollowedUserFromDB = async (loggedUser: JwtPayload) => {
  const followedUsers = await Followers.find({
    userId: loggedUser.id,
  }).populate('followerId');

  if (!followedUsers || followedUsers.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No followed users found');
  }

  const allPosts = [];

  for (const followedUser of followedUsers) {
    const posts = await Post.find({
      userId: followedUser.followerId._id,
    }).populate('userId');
    allPosts.push(...posts);
  }

  return allPosts;
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
  getFollowerAndFollowingCount,
};
