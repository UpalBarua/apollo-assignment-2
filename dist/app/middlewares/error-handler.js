"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
        error,
    });
};
exports.default = errorHandler;
//# sourceMappingURL=error-handler.js.map