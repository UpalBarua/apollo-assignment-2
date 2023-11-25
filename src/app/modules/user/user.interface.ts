import { z } from 'zod';

const fullNameSchema = z.object({
  firstName: z.string().min(1, { message: 'First name must not be empty' }),
  lastName: z.string().min(1, { message: 'Last name must not be empty' }),
});

const addressSchema = z.object({
  street: z.string().min(1, { message: 'Street must not be empty' }),
  city: z.string().min(1, { message: 'City must not be empty' }),
  country: z.string().min(1, { message: 'Country must not be empty' }),
});

export const orderSchema = z.object({
  productName: z.string().min(1, { message: 'Product name must not be empty' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be a positive integer' }),
});

export const userValidationSchema = z.object({
  userId: z
    .number()
    .int()
    .positive({ message: 'userId must be a positive integer' }),
  username: z
    .string()
    .min(1, { message: 'Username must not be empty' })
    .max(20, { message: 'Username must not be more than 20 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  fullName: fullNameSchema,
  age: z.number().int().positive({ message: 'Age must be a positive integer' }),
  email: z.string().email({ message: 'Invalid email format' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1, { message: 'Hobby must not be empty' })),
  address: addressSchema,
  orders: z.array(orderSchema).optional(),
});

export type FullName = z.infer<typeof fullNameSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Order = z.infer<typeof orderSchema>;
export type TUser = z.infer<typeof userValidationSchema>;
