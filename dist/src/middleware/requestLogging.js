"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../logging"));
// forces me to use `any` :\
const requestLoggingMiddleware = async (req, res, next) => {
    const httpMethod = req.method || 'UnknownMethod';
    const originalUrl = req.originalUrl || 'Unknown URL';
    logging_1.default.info(`${httpMethod} request to ${originalUrl}`);
    next();
};
exports.default = requestLoggingMiddleware;
//# sourceMappingURL=requestLogging.js.map