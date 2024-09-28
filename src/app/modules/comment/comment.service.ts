import { JwtPayload } from 'jsonwebtoken';
import { TPostComment } from './comment.interface';
import { Comment } from './comment.model';

const createComment = async (payload: TPostComment) => {
  const result = await Comment.create(payload);

  return result;
};

const updateComment = async (
  payload: Partial<TPostComment>,
  id: string,
  loggedUser: JwtPayload,
) => {
  const result = await Comment.findOneAndUpdate(
    {
      _id: id,
      userId: loggedUser.id,
    },
    { $set: payload },
    { new: true },
  );

  return result;
};

const deleteComment = async (id: string, loggedUser: JwtPayload) => {
  const result = await Comment.findOneAndDelete({
    _id: id,
    userId: loggedUser.id,
  });

  return result;
};

export const CommentServices = {
  createComment,
  updateComment,
  deleteComment,
};
