import { z } from 'zod';

const friendValidationSchema = z.object({
  body: z.object({
    friendId: z.string({ required_error: 'friendId is required' }),
    userId: z.string({ required_error: 'userId is required' }),
  }),
});

export const FriendValidations = {
  friendValidationSchema,
};
