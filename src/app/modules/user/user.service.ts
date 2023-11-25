import { TOrder, TUser } from './user.interface';
import User from './user.model';

export const insertUserInDB = async (newUserData: TUser) => {
  const existingUser = await User.getExistingUser(
    newUserData.userId.toString()
  );

  if (existingUser) {
    throw new Error('userId already exists');
  }

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
  const existingUser = await User.getExistingUser(userId.toString());

  if (!existingUser) {
    throw new Error('user does not exist');
  }

  return existingUser;
};

export const deleteUserFromDB = async (userId: string) => {
  const existingUser = await User.getExistingUser(userId.toString());

  if (!existingUser) {
    throw new Error('user does not exist');
  }

  const deletedUser = await User.findOneAndDelete({ userId });
  return deletedUser;
};

export const updateUserFromDB = async (user: TUser) => {
  const existingUser = await User.getExistingUser(user.userId.toString());

  if (!existingUser) {
    throw new Error('user does not exist');
  }

  const updatedUser = await User.updateOne(
    { userId: user.userId },
    { $set: user },
    { new: true }
  );

  return updatedUser;
};

export const insertNewOrder = async (userId: string, order: TOrder) => {
  const existingUser = await User.getExistingUser(userId);

  if (!existingUser) {
    throw new Error('user does not exist');
  }

  if (existingUser.orders) {
    return await User.updateOne(
      { userId },
      { $push: { orders: order } },
      { new: true }
    );
  }

  return await User.updateOne(
    { userId },
    { $set: { orders: [order] } },
    { upsert: true }
  );
};

export const findUserOrders = async (userId: string) => {
  const existingUser = await User.getExistingUser(userId);

  if (!existingUser) {
    throw new Error('user does not exist');
  }

  return existingUser.orders;
};

export const sumOrdersTotalPrice = async (userId: string) => {
  const totalPrice = await User.aggregate([
    {
      $match: { userId: Number(userId) },
    },
    {
      $project: {
        _id: 0,
        totalPrice: {
          $sum: '$orders.price',
        },
      },
    },
  ]);

  return totalPrice;
};
