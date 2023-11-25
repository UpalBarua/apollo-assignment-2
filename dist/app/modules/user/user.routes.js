"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', user_controller_1.getAllUsers);
router.get('/:userId', user_controller_1.getUserById);
router.post('/', user_controller_1.createNewUser);
router.delete('/:userId', user_controller_1.deleteUserById);
router.put('/:userId', user_controller_1.updateUser);
router.put('/:userId/orders', user_controller_1.addNewOrder);
router.get('/:userId/orders', user_controller_1.getUserOrders);
router.get('/:userId/orders/total-price', user_controller_1.getOrdersTotalPrice);
exports.default = router;
//# sourceMappingURL=user.routes.js.map