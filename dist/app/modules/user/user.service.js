"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumOrdersTotalPrice = exports.findUserOrders = exports.insertNewOrder = exports.updateUserFromDB = exports.deleteUserFromDB = exports.findUserById = exports.findAllUsers = exports.insertUserInDB = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const insertUserInDB = async (newUserData) => {
    const existingUser = await user_model_1.default.getExistingUser(newUserData.userId);
    if (existingUser) {
        throw new Error('userId already exists');
    }
    const newUser = new user_model_1.default(newUserData);
    await newUser.save();
    return await user_model_1.default.findOne({ userId: newUserData.userId });
};
exports.insertUserInDB = insertUserInDB;
const findAllUsers = async () => {
    return await user_model_1.default.find({}).select({
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        email: 1,
        age: 1,
        address: 1,
    });
};
exports.findAllUsers = findAllUsers;
const findUserById = async (userId) => {
    const existingUser = await user_model_1.default.getExistingUser(userId);
    if (!existingUser) {
        throw new Error('user does not exist');
    }
    return await user_model_1.default.findOne({ userId });
};
exports.findUserById = findUserById;
const deleteUserFromDB = async (userId) => {
    const existingUser = await user_model_1.default.getExistingUser(userId);
    if (!existingUser) {
        throw new Error('user does not exist');
    }
    return await user_model_1.default.findOneAndDelete({ userId });
};
exports.deleteUserFromDB = deleteUserFromDB;
const updateUserFromDB = async (user) => {
    const existingUser = await user_model_1.default.getExistingUser(user.userId);
    if (!existingUser) {
        throw new Error('user does not exist');
    }
    await user_model_1.default.updateOne({ userId: user.userId }, { $set: user }, { upsert: true });
    return await user_model_1.default.findOne({ userId: user.userId });
};
exports.updateUserFromDB = updateUserFromDB;
const insertNewOrder = async (userId, order) => {
    const existingUser = await user_model_1.default.getExistingUser(userId);
    if (!existingUser) {
        throw new Error('user does not exist');
    }
    if (existingUser.orders) {
        return await user_model_1.default.updateOne({ userId }, { $push: { orders: order } }, { new: true });
    }
    return await user_model_1.default.updateOne({ userId }, { $set: { orders: [order] } }, { upsert: true });
};
exports.insertNewOrder = insertNewOrder;
const findUserOrders = async (userId) => {
    const existingUser = await user_model_1.default.getExistingUser(userId);
    if (!existingUser) {
        throw new Error('user does not exist');
    }
    return await user_model_1.default.findOne({ userId }).select({ orders: 1, _id: 0 });
};
exports.findUserOrders = findUserOrders;
const sumOrdersTotalPrice = async (userId) => {
    const totalPrice = await user_model_1.default.aggregate([
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
exports.sumOrdersTotalPrice = sumOrdersTotalPrice;
//# sourceMappingURL=user.service.js.map