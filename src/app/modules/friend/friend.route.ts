import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FriendValidations } from './friend.validation';
import { FriendController } from './friend.controller';

const router = Router();

router.post(
  '/request',
  auth('user', 'admin'),
  validateRequest(FriendValidations.friendValidationSchema),
  FriendController.sendFriendRequest,
);

router.delete(
  '/cancel',
  auth('user', 'admin'),
  validateRequest(FriendValidations.friendValidationSchema),
  FriendController.cancelFriendRequest,
);

router.post(
  '/accept',
  auth('user', 'admin'),
  validateRequest(FriendValidations.friendValidationSchema),
  FriendController.acceptedFriend,
);

router.get(
  '/request/:userId',
  auth('user', 'admin'),
  FriendController.getFriendRequest,
);

router.get(
  '/status',
  auth('user', 'admin'),
  FriendController.checkFriendRequestStatus,
);

router.get(
  '/list/:userId',
  auth('user', 'admin'),
  FriendController.getFriendList,
);

router.delete(
  '/',
  auth('user', 'admin'),
  validateRequest(FriendValidations.friendValidationSchema),
  FriendController.rejectedFriend,
);

export const FriendRoutes = router;
