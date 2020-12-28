"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInterceptor = void 0;
const logging_1 = __importDefault(require("../logging"));
exports.ErrorInterceptor = async ({ info }, next) => {
    try {
        const { fieldName } = info;
        logging_1.default.info(`fieldName-- ${fieldName}`);
        return await next();
    }
    catch (err) {
        logging_1.default.error(`${err}`);
        throw err;
    }
};
//# sourceMappingURL=Error.js.map