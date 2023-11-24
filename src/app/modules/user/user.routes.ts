import express from 'express';
import {
  createNewUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUser,
} from './user.controller';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createNewUser);
router.delete('/:userId', deleteUserById);
router.put('/:userId', updateUser);

export default router;
