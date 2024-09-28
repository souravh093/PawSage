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

router.get('/:userId', auth('admin', 'user'), FollowersController.getFollowers);

router.delete(
  '/',
  auth('admin', 'user'),
  validateRequest(FollowersValidations.followersValidationSchema),
  FollowersController.unFollow,
);

export const FollowersRoutes = router;
