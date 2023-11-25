"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./app/config");
const main = async () => {
    try {
        await mongoose_1.default.connect(config_1.DB_URI);
        app_1.default.listen(config_1.PORT, () => {
            console.log('[server] running on http://localhost:8080/');
        });
    }
    catch (error) {
        console.error(error);
    }
};
main();
//# sourceMappingURL=server.js.map