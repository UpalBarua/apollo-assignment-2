import { NextFunction, Request, Response } from 'express';
import { orderSchema, userValidationSchema } from './user.interface';
import {
  deleteUserFromDB,
  findAllUsers,
  findUserById,
  findUserOrders,
  insertNewOrder,
  insertUserInDB,
  sumOrdersTotalPrice,
  updateUserFromDB,
} from './user.service';

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const validationResults = userValidationSchema.safeParse(body);

    if (!validationResults.success) {
      return res.status(400).json({
        success: false,
        message: 'Something went wrong',
        error: validationResults.error,
      });
    }

    const result = await insertUserInDB(validationResults.data);

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
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await findAllUsers();

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
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'invalid userId',
      });
    }

    const user = await findUserById(Number(userId));

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
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'invalid userId',
      });
    }

    const user = await deleteUserFromDB(userId);

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
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { userId },
      body,
    } = req;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'invalid userId',
      });
    }

    const validationResults = userValidationSchema.safeParse(body);

    if (!validationResults.success) {
      return res.status(400).json({
        success: false,
        message: 'something went wrong',
        error: validationResults.error,
      });
    }

    const updatedUser = await updateUserFromDB(validationResults.data);

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
  } catch (error) {
    next(error);
  }
};

export const addNewOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { userId },
      body,
    } = req;

    const validationResults = orderSchema.safeParse(body);

    if (!validationResults.success) {
      return res.status(400).json({
        success: false,
        message: 'something went wrong',
        error: validationResults.error,
      });
    }

    await insertNewOrder(Number(userId), validationResults.data);

    res.status(201).json({
      success: true,
      message: 'order created successfully!',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { userId },
    } = req;

    const orders = await findUserOrders(userId as string);

    res.status(200).json({
      success: true,
      message: 'orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersTotalPrice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      params: { userId },
    } = req;

    const totalPrice = await sumOrdersTotalPrice(userId as string);

    res.status(200).json({
      success: false,
      message: 'total price of all the orders retrieved',
      data: totalPrice,
    });
  } catch (error) {
    next(error);
  }
};
