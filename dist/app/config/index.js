"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALT_WORK_FACTOR = exports.PORT = exports.DB_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string(),
    DB_URI: zod_1.z.string().url(),
    SALT_WORK_FACTOR: zod_1.z.string(),
});
_a = envSchema.parse(process.env), exports.DB_URI = _a.DB_URI, exports.PORT = _a.PORT, exports.SALT_WORK_FACTOR = _a.SALT_WORK_FACTOR;
//# sourceMappingURL=index.js.map