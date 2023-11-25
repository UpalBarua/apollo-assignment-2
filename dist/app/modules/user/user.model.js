"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = require("../../config");
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [1, 'First name must not be empty'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [1, 'Last name must not be empty'],
    },
});
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, 'Street is required'],
        minlength: [1, 'Street must not be empty'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        minlength: [1, 'City must not be empty'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        minlength: [1, 'Country must not be empty'],
    },
});
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        minlength: [1, 'Product name must not be empty'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: (value) => value > 0,
            message: 'Price must be a positive number',
        },
    },
    quantity: {
        type: Number,
        default: 1,
        validate: {
            validator: (value) => Number.isInteger(value) && value > 0,
            message: 'Quantity must be a positive integer',
        },
    },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'User ID is required'],
        validate: {
            validator: (value) => Number.isInteger(value) && value > 0,
            message: 'User ID must be a positive integer',
        },
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [1, 'Username must not be empty'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    fullName: { type: fullNameSchema, required: [true, 'Full name is required'] },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        validate: {
            validator: (value) => Number.isInteger(value) && value > 0,
            message: 'Age must be a positive integer',
        },
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        unique: true,
    },
    isActive: { type: Boolean, default: true },
    hobbies: {
        type: [String],
        validate: {
            validator: (value) => value.every((hobby) => typeof hobby === 'string' && hobby.length > 0),
            message: 'Hobbies must be a non-empty array of strings',
        },
    },
    address: { type: addressSchema, required: [true, 'Address is required'] },
    orders: { type: [orderSchema] },
});
userSchema.statics.getExistingUser = async (userId) => {
    return await User.findOne({ userId });
};
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt_1.default.genSalt(Number(config_1.SALT_WORK_FACTOR), (err, salt) => {
        if (err)
            return next(err);
        bcrypt_1.default.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
userSchema.pre('find', function (next) {
    this.find({}).select('-password');
    next();
});
userSchema.pre('findOne', function (next) {
    this.findOne({}).select('-password');
    next();
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map