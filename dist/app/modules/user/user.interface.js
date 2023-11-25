"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = exports.orderSchema = void 0;
const zod_1 = require("zod");
const fullNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: 'First name must not be empty' }),
    lastName: zod_1.z.string().min(1, { message: 'Last name must not be empty' }),
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, { message: 'Street must not be empty' }),
    city: zod_1.z.string().min(1, { message: 'City must not be empty' }),
    country: zod_1.z.string().min(1, { message: 'Country must not be empty' }),
});
exports.orderSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1, { message: 'Product name must not be empty' }),
    price: zod_1.z.number().positive({ message: 'Price must be a positive number' }),
    quantity: zod_1.z
        .number()
        .int()
        .positive({ message: 'Quantity must be a positive integer' }),
});
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z
        .number()
        .int()
        .positive({ message: 'userId must be a positive integer' }),
    username: zod_1.z
        .string()
        .min(1, { message: 'Username must not be empty' })
        .max(20, { message: 'Username must not be more than 20 characters' }),
    password: zod_1.z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
    fullName: fullNameSchema,
    age: zod_1.z.number().int().positive({ message: 'Age must be a positive integer' }),
    email: zod_1.z.string().email({ message: 'Invalid email format' }),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string().min(1, { message: 'Hobby must not be empty' })),
    address: addressSchema,
    orders: zod_1.z.array(exports.orderSchema).optional(),
});
//# sourceMappingURL=user.interface.js.map