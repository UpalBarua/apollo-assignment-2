"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersTotalPrice = exports.getUserOrders = exports.addNewOrder = exports.updateUser = exports.deleteUserById = exports.getUserById = exports.getAllUsers = exports.createNewUser = void 0;
const user_interface_1 = require("./user.interface");
const user_service_1 = require("./user.service");
const createNewUser = async (req, res, next) => {
    try {
        const { body } = req;
        const validationResults = user_interface_1.userValidationSchema.safeParse(body);
        if (!validationResults.success) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong',
                error: validationResults.error,
            });
        }
        const result = await (0, user_service_1.insertUserInDB)(validationResults.data);
        if (result) {
            return res.status(201).json({
                success: true,
                message: 'User created successfully!',
                data: result,
            });
        }
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createNewUser = createNewUser;
const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await (0, user_service_1.findAllUsers)();
        if (allUsers) {
            return res.status(200).json({
                success: true,
                message: 'successfully retrieved all users',
                data: allUsers,
            });
        }
        res.status(400).json({
            success: false,
            message: 'something went wrong',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'invalid userId',
            });
        }
        const user = await (0, user_service_1.findUserById)(Number(userId));
        if (user) {
            return res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: user,
            });
        }
        res.status(400).json({
            success: false,
            message: 'something went wrong',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
const deleteUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'invalid userId',
            });
        }
        const user = await (0, user_service_1.deleteUserFromDB)(Number(userId));
        if (user) {
            return res.status(202).json({
                success: true,
                message: 'User deleted successfully',
                data: null,
            });
        }
        res.status(400).json({
            success: false,
            message: 'something went wrong',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUserById = deleteUserById;
const updateUser = async (req, res, next) => {
    try {
        const { params: { userId }, body, } = req;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'invalid userId',
            });
        }
        const validationResults = user_interface_1.userValidationSchema.safeParse(body);
        if (!validationResults.success) {
            return res.status(400).json({
                success: false,
                message: 'something went wrong',
                error: validationResults.error,
            });
        }
        const updatedUser = await (0, user_service_1.updateUserFromDB)(validationResults.data);
        if (updatedUser) {
            return res.status(200).json({
                success: true,
                message: 'successfully retrieved specific user',
                data: updatedUser,
            });
        }
        res.status(400).json({
            success: false,
            message: 'something went wrong',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
const addNewOrder = async (req, res, next) => {
    try {
        const { params: { userId }, body, } = req;
        const validationResults = user_interface_1.orderSchema.safeParse(body);
        if (!validationResults.success) {
            return res.status(400).json({
                success: false,
                message: 'something went wrong',
                error: validationResults.error,
            });
        }
        await (0, user_service_1.insertNewOrder)(Number(userId), validationResults.data);
        res.status(201).json({
            success: true,
            message: 'order created successfully!',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addNewOrder = addNewOrder;
const getUserOrders = async (req, res, next) => {
    try {
        const { params: { userId }, } = req;
        const orders = await (0, user_service_1.findUserOrders)(Number(userId));
        res.status(200).json({
            success: true,
            message: 'orders retrieved successfully',
            data: orders,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserOrders = getUserOrders;
const getOrdersTotalPrice = async (req, res, next) => {
    try {
        const { params: { userId }, } = req;
        const totalPrice = await (0, user_service_1.sumOrdersTotalPrice)(Number(userId));
        res.status(200).json({
            success: false,
            message: 'total price of all the orders retrieved',
            data: totalPrice,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getOrdersTotalPrice = getOrdersTotalPrice;
//# sourceMappingURL=user.controller.js.map