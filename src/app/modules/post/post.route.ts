import { Router } from 'express';
import auth from '../../middlewares/auth';
import { PostController } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { PostValidation } from './post.validation';

const router = Router();

router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(PostValidation.createPostValidationSchema),
  PostController.createPost,
);

router.get('/me', auth('admin', 'user'), PostController.getMyPosts);

router.get('/', PostController.getPosts);

router.get('/:id', PostController.getSinglePost);

router.put(
  '/:id',
  auth('admin', 'user'),
  validateRequest(PostValidation.updatePostValidationSchema),
  PostController.updatePost,
);

router.delete('/:id', auth('admin', 'user'), PostController.deletePost);

export const PostRoutes = router;
