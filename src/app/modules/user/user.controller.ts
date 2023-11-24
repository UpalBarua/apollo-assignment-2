import { Request, Response } from 'express';
import { userValidationSchema } from './user.interface';
import {
  deleteUserFromDB,
  findAllUsers,
  findUserById,
  insertUserInDB,
  updateUserFromDB,
} from './user.services';

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const validationResults = userValidationSchema.safeParse(body);

    if (!validationResults.success) {
      return res.status(400).json({
        success: false,
        message: 'something went wrong',
        error: validationResults.error,
      });
    }

    const result = await insertUserInDB(validationResults.data);

    if (result) {
      return res.status(201).json({
        success: true,
        message: 'successfully created new user',
        data: result,
      });
    }

    res.status(400).json({
      success: false,
      message: 'something went wrong',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'invalid userId',
      });
    }

    const user = await findUserById(userId);

    if (user) {
      return res.status(200).json({
        success: true,
        message: 'successfully retrieved specific user',
        data: user,
      });
    }

    res.status(400).json({
      success: false,
      message: 'something went wrong',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
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
        message: 'successfully deleted specific user',
        data: null,
      });
    }

    res.status(400).json({
      success: false,
      message: 'something went wrong',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
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

    const updatedUser = await updateUserFromDB(userId, validationResults.data);

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
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error,
    });
  }
};
