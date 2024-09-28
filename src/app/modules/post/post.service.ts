import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TPost } from './post.interface';
import { Post } from './post.modal';

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);

  return result;
};

const getPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find().populate('userId'), query)
    .search(['title', 'content'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await postQuery.modelQuery;
  const meta = await postQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSinglePostFromDB = async (id: string) => {
  const findPost = await Post.findById(id);

  if (!findPost) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  return findPost;
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
};
