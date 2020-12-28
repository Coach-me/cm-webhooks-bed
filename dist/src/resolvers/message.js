"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResolver = exports.messagesSync = void 0;
const type_graphql_1 = require("type-graphql");
const model_1 = require("../models/message/model");
const enums_1 = require("../definitions/enums");
const message_input_1 = require("./types/message-input");
const getMessage_1 = require("../utils/getMessage");
let MessageResolver = /** @class */ (() => {
    let MessageResolver = class MessageResolver {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async messageByKey(key) {
            const message = await model_1.MessageModel.find().findByKey(key);
            if (!message) {
                await getMessage_1.getMessage(24); // No existe mensaje
            }
            return message;
        }
        async messagesByType(type) {
            return model_1.MessageModel.find({ type });
        }
        async allMessages() {
            exports.messagesSync = await model_1.MessageModel.find();
            return exports.messagesSync;
        }
        async createMessages(messages) {
            return model_1.MessageModel.create(messages);
        }
    };
    __decorate([
        type_graphql_1.Query((_returns) => model_1.Message, { nullable: false }),
        __param(0, type_graphql_1.Arg('key')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], MessageResolver.prototype, "messageByKey", null);
    __decorate([
        type_graphql_1.Query(() => [model_1.Message]),
        __param(0, type_graphql_1.Arg('type', () => enums_1.MessageType)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], MessageResolver.prototype, "messagesByType", null);
    __decorate([
        type_graphql_1.Authorized(enums_1.UserType.CO),
        type_graphql_1.Query(() => [model_1.Message]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], MessageResolver.prototype, "allMessages", null);
    __decorate([
        type_graphql_1.Mutation(() => [model_1.Message]),
        __param(0, type_graphql_1.Arg('messages', () => [message_input_1.MessageInput])),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], MessageResolver.prototype, "createMessages", null);
    MessageResolver = __decorate([
        type_graphql_1.Resolver()
    ], MessageResolver);
    return MessageResolver;
})();
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=message.js.map