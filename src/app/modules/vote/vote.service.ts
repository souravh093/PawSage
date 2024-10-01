import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TVote } from './vote.interface';
import { Vote } from './vote.modal';
import { Post } from '../post/post.modal';

const upVoteIntoDB = async (payload: TVote) => {
  const isVotedPost = await Vote.findOne({
    postId: payload.postId,
    userId: payload.userId,
  });

  if (isVotedPost) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You have already voted');
  }

  const findPost = await Post.findById(payload.postId);

  if (!findPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  if (findPost) {
    await Post.findByIdAndUpdate(payload.postId, { $inc: { likes: 1 } });
  }

  const result = await Vote.create(payload);

  return result;
};

const downVoteIntoDB = async (payload: TVote) => {
  const isVotedPost = await Vote.findOne({
    postId: payload.postId,
    userId: payload.userId,
  });

  const findPost = await Post.findById(payload.postId);

  if (!findPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  if (isVotedPost) {
    await Vote.findOneAndDelete({
      postId: payload.postId,
      userId: payload.userId,
    });

    await Post.findByIdAndUpdate(payload.postId, { $inc: { likes: -1 } });
  }

  if(!isVotedPost) {
    await Vote.create(payload);
  }

  const result = await Post.findByIdAndUpdate(payload.postId, {
    $inc: { likes: -1 },
  });

  return result;    
};

export const VoteServices = {
  upVoteIntoDB,
  downVoteIntoDB,
};
