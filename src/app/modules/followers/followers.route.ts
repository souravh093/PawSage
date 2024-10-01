import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FollowersValidations } from './followers.validation';
import { FollowersController } from './followers.controller';

const router = Router();

router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(FollowersValidations.followersValidationSchema),
  FollowersController.following,
);

router.get('/checkFollow', FollowersController.isFollowing);

router.get(
  '/:userId',
  auth('admin', 'user'),
  FollowersController.getFollowedUser,
);

router.get(
  '/:followerId',
  auth('admin', 'user'),
  FollowersController.getFollowers,
);

router.delete(
  '/',
  auth('admin', 'user'),
  FollowersController.unFollow,
);

export const FollowersRoutes = router;
