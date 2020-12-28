"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageSync = exports.getMessage = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const lodash_1 = __importDefault(require("lodash"));
const model_1 = require("../models/message/model");
const message_1 = require("../resolvers/message");
const constants_1 = require("../constants");
exports.getMessage = async (key) => {
    const { message, type } = await model_1.MessageModel.find()
        .findByKey(key)
        .catch(() => {
        throw new apollo_server_errors_1.ApolloError('No error found', '0');
    });
    throw new apollo_server_errors_1.ApolloError(message, undefined, { key, type });
};
exports.getMessageSync = (key) => {
    if (!lodash_1.default.isEmpty(message_1.messagesSync) && message_1.messagesSync.length) {
        try {
            return message_1.messagesSync.find((message) => message.key === key).message;
        }
        catch (e) {
            return constants_1.messageDefault;
        }
    }
    return constants_1.messageDefault;
};
//# sourceMappingURL=getMessage.js.map