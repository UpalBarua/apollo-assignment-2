import type { Order, TUser } from './user.interface';
import User from './user.model';

export const insertUserInDB = async (newUserData: TUser) => {
  const existingUser = await User.getExistingUser(newUserData.userId);

  if (existingUser) {
    throw new Error('userId already exists');
  }

  const newUser = new User(newUserData);
  await newUser.save();

  return await User.findOne({ userId: newUserData.userId });
};

export const findAllUsers = async () => {
  return await User.find({}).select({
    _id: 0,
    userId: 1,
    username: 1,
    fullName: 1,
    email: 1,
    age: 1,
    address: 1,
  });
};

export const findUserById = async (userId: number) => {
  const existingUser = await User.getExistingUser(userId);

  if (!existingUser) {
    throw new Error('user does not exist');
  }

  return await User.findOne({ userId });
};

export const deleteUserFromDB = async (userId: number) => {
  const existingUser = await User.getExistingUser(userId);

  if (!existingUser) {
    throw new Error('user does not exist');
  }

  return await User.findOneAndDelete({ userId });
};

export const updateUserFromDB = async (user: TUser) => {
  const existingUser = await User.getExistingUser(user.userId);

  if (!existingUser) {
    throw new Error('user does not exist');
  }

  await User.updateOne(
    { userId: user.userId },
    { $set: user },
    { upsert: true }
  );

  return await User.findOne({ userId: user.userId });
};

export const insertNewOrder = async (userId: number, order: Order) => {
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

export const findUserOrders = async (userId: number) => {
  const existingUser = await User.getExistingUser(userId);

  if (!existingUser) {
    throw new Error('user does not exist');
  }

  return await User.findOne({ userId }).select({ orders: 1, _id: 0 });
};

export const sumOrdersTotalPrice = async (userId: number) => {
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
