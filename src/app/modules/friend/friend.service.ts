/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFriend } from './friend.interface';
import { Friend } from './friend.modal';

const sendFriendRequestToDB = async (payload: Partial<IFriend>) => {

  const isRequestSend = await Friend.findOne({
    userId: payload.userId,
    friendId: payload.friendId,
  });

  if (isRequestSend) {
    throw new Error('Friend request already sent');
  }

  const friendRequestData = {
    userId: payload.userId,
    friendId: payload.friendId,
    status: 'pending',
  };

  const result = await Friend.create(friendRequestData);

  return result;
};

const cancelFriendRequestFromDB = async (payload: Partial<IFriend>) => {

  const result = await Friend.deleteOne({
    userId: payload.userId,
    friendId: payload.friendId,
  });

  return result;
}

const acceptedFriendFromDB = async (payload: Partial<IFriend>) => {
  const result = await Friend.findOneAndUpdate(
    {
      userId: payload.friendId,
      friendId: payload.userId,
    },
    {
      status: 'accepted',
    }
  )

  return result;
};

const getFriendListFromDB = async (userId: string) => {
  const friends = await Friend.find({
    friendId: userId,
    status: 'accepted',
  }).populate('userId');

  return friends;
};

const getFriendRequestFromDB = async (userId: string) => {
  const friends = await Friend.find({
    friendId: userId,
    status: 'pending',
  }).populate('friendId').populate('userId');

  return friends;
};

const rejectedFriendFromDB = async (payload: Partial<IFriend>) => {
  const friendRequestData = {
    userId: payload.userId,
    friendId: payload.friendId,
    status: 'rejected',
  };

  const result = await Friend.create(friendRequestData);

  return result;
};

const checkFriendRequestStatus = async (query: Record<string, any>) => {
  const friend = await Friend.findOne({
    userId: query.userId,
    friendId: query.friendId,
    status: "pending"
  });

  return friend;
};

export const FriendService = {
  acceptedFriendFromDB,
  getFriendListFromDB,
  checkFriendRequestStatus,
  rejectedFriendFromDB,
  sendFriendRequestToDB,
  cancelFriendRequestFromDB,
  getFriendRequestFromDB,
};
