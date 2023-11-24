import { model, Schema, Document } from 'mongoose';
import { TUser, TFullName, TAddress, TOrder } from './user.interface';

type TUserSchema = Document & TUser;

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [1, 'First name must not be empty'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [1, 'Last name must not be empty'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
    minlength: [1, 'Street must not be empty'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    minlength: [1, 'City must not be empty'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    minlength: [1, 'Country must not be empty'],
  },
});

const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [1, 'Product name must not be empty'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    validate: {
      validator: (value: number) => value > 0,
      message: 'Price must be a positive number',
    },
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    validate: {
      validator: (value: number) => Number.isInteger(value) && value > 0,
      message: 'Quantity must be a positive integer',
    },
  },
});

const userSchema = new Schema<TUserSchema>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    validate: {
      validator: (value: number) => Number.isInteger(value) && value > 0,
      message: 'User ID must be a positive integer',
    },
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [1, 'Username must not be empty'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  fullName: { type: fullNameSchema, required: [true, 'Full name is required'] },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    validate: {
      validator: (value: number) => Number.isInteger(value) && value > 0,
      message: 'Age must be a positive integer',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    unique: true,
  },
  isActive: { type: Boolean, default: true },
  hobbies: {
    type: [String],
    validate: {
      validator: (value: string[]) =>
        value.every((hobby) => typeof hobby === 'string' && hobby.length > 0),
      message: 'Hobbies must be a non-empty array of strings',
    },
  },
  address: { type: addressSchema, required: [true, 'Address is required'] },
  orders: { type: [orderSchema] },
});

const User = model<TUserSchema>('User', userSchema);

export default User;