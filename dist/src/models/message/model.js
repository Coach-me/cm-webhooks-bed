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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const methods_1 = require("./methods");
const enums_1 = require("../../definitions/enums");
let Message = /** @class */ (() => {
    let Message = class Message {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        __metadata("design:type", String)
    ], Message.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: true, unique: true }),
        __metadata("design:type", Number)
    ], Message.prototype, "key", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Message.prototype, "message", void 0);
    __decorate([
        type_graphql_1.Field(() => enums_1.MessageType),
        typegoose_1.prop({ required: true, enum: enums_1.MessageType }),
        __metadata("design:type", String)
    ], Message.prototype, "type", void 0);
    Message = __decorate([
        type_graphql_1.ObjectType({ description: 'Messages model' }),
        typegoose_1.queryMethod(methods_1.findByKey),
        typegoose_1.queryMethod(methods_1.findByType)
    ], Message);
    return Message;
})();
exports.Message = Message;
exports.MessageModel = typegoose_1.getModelForClass(Message, {
    existingMongoose: mongoose_1.default,
    schemaOptions: { collection: 'messages' },
});
//# sourceMappingURL=model.js.map