import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be string' })
    .max(20, { message: "Password cann't be more than 20 charactors" })
    .optional(),
});

export const UserSchema = {
  userValidationSchema,
};
