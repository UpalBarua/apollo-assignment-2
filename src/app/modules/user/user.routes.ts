import express from 'express';
import {
  addNewOrder,
  createNewUser,
  deleteUserById,
  getAllUsers,
  getOrdersTotalPrice,
  getUserById,
  getUserOrders,
  updateUser,
} from './user.controller';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createNewUser);
router.delete('/:userId', deleteUserById);
router.put('/:userId', updateUser);
router.put('/:userId/orders', addNewOrder);
router.get('/:userId/orders', getUserOrders);
router.get('/:userId/orders/total-price', getOrdersTotalPrice);

export default router;
