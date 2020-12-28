"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logging_1 = __importDefault(require("./logging"));
const database_1 = require("./database");
const message_1 = require("./resolvers/message");
require('dotenv-safe').config();
database_1.connect().then(async () => {
    const appInstance = await app_1.default();
    appInstance.listen(process.env.PORT, async () => {
        logging_1.default.info(`🚀🚀 STARTED ENV=${process.env.NODE_ENV} PORT=${process.env.PORT} 🚀🚀`);
        await new message_1.MessageResolver().allMessages();
    });
});
//# sourceMappingURL=index.js.map