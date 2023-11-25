"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const error_handler_1 = __importDefault(require("./app/middlewares/error-handler"));
const user_routes_1 = __importDefault(require("./app/modules/user/user.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use(error_handler_1.default);
app.use('/api/users', user_routes_1.default);
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found. Please check the URL and try again.',
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map