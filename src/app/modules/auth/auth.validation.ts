import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Id is required.' }),
  password: z.string({ required_error: 'Password is required' }),
});

const RegisterValidationSchema = z.object({
  name: z.string({ required_error: "Name is required." }),
  email: z.string({ required_error: "Email is required." }).email("Invalid email format"),
  password: z.string({ required_error: "Password is required." }),
  role: z.enum(["admin", "user"]).default("user").optional(),
  isBlocked: z.boolean().default(false).optional(),
  imageUrl: z.string().optional(),
  city: z.string().optional(),
  presentAddress: z.string().optional(),
  phone: z.string().optional(),
});

export default RegisterValidationSchema;

export const AuthValidation = {
  loginValidationSchema,
  RegisterValidationSchema,
};
