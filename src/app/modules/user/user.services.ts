import { userInfo } from 'os';
import { TUser } from './user.interface';
import User from './user.model';

export const insertUserInDB = async (newUserData: TUser) => {
  const newUser = new User(newUserData);
  const result = await newUser.save();
  return result;
};

export const findAllUsers = async () => {
  const allUsers = await User.find({}).select({
    userId: 1,
    username: 1,
    fullName: 1,
    email: 1,
    age: 1,
    address: 1,
  });
  return allUsers;
};

export const findUserById = async (userId: string) => {
  const user = await User.findOne({ userId });
  return user;
};

export const deleteUserFromDB = async (userId: string) => {
  const deletedUser = await User.findOneAndDelete({ userId });
  return deletedUser;
};

export const updateUserFromDB = async (userId: string, user: TUser) => {
  const updatedUser = await User.updateOne(
    { userId },
    { $set: user },
    { new: true }
  );
  return updatedUser;
};
