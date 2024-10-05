import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TPost } from './post.interface';
import { Post } from './post.modal';
import { Comment } from '../comment/comment.model';
import { JwtPayload } from 'jsonwebtoken';
const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);

  return result;
};

const getMyPostsFromDB = async (loggedUser: JwtPayload) => {
  const posts = await Post.find({ userId: loggedUser.id }).populate('userId');

  return posts;
};

const getPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find().populate('userId'), query)
    .search(['title', 'content'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const posts = await postQuery.modelQuery.lean();
  const meta = await postQuery.countTotal();

  const postIds = posts.map((post) => post._id);
  const comments = await Comment.find({ postId: { $in: postIds } }).populate("userId");

  const postsWithComments = posts.map((post) => ({
    ...post,
    comments: comments.filter((comment) => comment.postId.equals(post._id)),
  }));

  return {
    meta,
    result: postsWithComments,
  };
};

const getSinglePostFromDB = async (id: string) => {
  const findPost = await Post.findById(id).populate('userId');

  if (!findPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const comments = await Comment.find({ postId: id }).populate('userId');

  const postWithComments = {
    ...findPost.toObject(),
    comments,
  };

  return postWithComments;
};

const updatePostIntoDB = async (payload: Partial<TPost>, id: string) => {
  const result = await Post.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deletePostFromDB = async (id: string) => {
  const result = await Post.findByIdAndDelete(id);

  return result;
};

export const PostServices = {
  createPostIntoDB,
  getPostsFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  deletePostFromDB,
  getMyPostsFromDB,
};
