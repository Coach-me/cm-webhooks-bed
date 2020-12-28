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
exports.UserModel = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const methods_1 = require("./methods");
const enums_1 = require("../../definitions/enums");
let SkillCoach = /** @class */ (() => {
    let SkillCoach = class SkillCoach {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        __metadata("design:type", String)
    ], SkillCoach.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], SkillCoach.prototype, "name", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Number)
    ], SkillCoach.prototype, "price", void 0);
    __decorate([
        type_graphql_1.Field(() => User),
        typegoose_1.prop({
            immutable: true,
            required: true,
            type: mongoose_1.default.Schema.Types.ObjectId,
        }),
        __metadata("design:type", String)
    ], SkillCoach.prototype, "coachId", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: true, default: false }),
        __metadata("design:type", Boolean)
    ], SkillCoach.prototype, "deleted", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", Number)
    ], SkillCoach.prototype, "score", void 0);
    SkillCoach = __decorate([
        type_graphql_1.ObjectType()
    ], SkillCoach);
    return SkillCoach;
})();
let User = /** @class */ (() => {
    let User = class User {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ immutable: true, required: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], User.prototype, "idType", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], User.prototype, "idNumber", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], User.prototype, "token", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Date)
    ], User.prototype, "lastLogin", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", Date)
    ], User.prototype, "birthday", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], User.prototype, "cellphone", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], User.prototype, "accountType", void 0);
    __decorate([
        type_graphql_1.Field(() => enums_1.BankAccountType, { nullable: true }),
        typegoose_1.prop({ required: false, enum: enums_1.BankAccountType }),
        __metadata("design:type", String)
    ], User.prototype, "bankAccountType", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], User.prototype, "bank", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], User.prototype, "accountNumber", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], User.prototype, "phoneNumber", void 0);
    __decorate([
        type_graphql_1.Field(() => enums_1.UserType, { nullable: true }),
        typegoose_1.prop({ required: true, enum: enums_1.UserType, immutable: true }),
        __metadata("design:type", String)
    ], User.prototype, "userType", void 0);
    __decorate([
        type_graphql_1.Field(() => enums_1.AuthType),
        typegoose_1.prop({ required: true, enum: enums_1.AuthType }),
        __metadata("design:type", String)
    ], User.prototype, "authType", void 0);
    __decorate([
        type_graphql_1.Field(() => [SkillCoach], { nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", Array)
    ], User.prototype, "skills", void 0);
    __decorate([
        type_graphql_1.Field(() => [String], { nullable: true }),
        typegoose_1.prop({ type: Array, required: false }),
        __metadata("design:type", String)
    ], User.prototype, "interests", void 0);
    __decorate([
        type_graphql_1.Field(() => Boolean, { nullable: true }),
        typegoose_1.prop({ required: false, default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "profilePicture", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], User.prototype, "instagramProfile", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], User.prototype, "facebookProfile", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], User.prototype, "linkedinProfile", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", Number)
    ], User.prototype, "score", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "accessToken", void 0);
    User = __decorate([
        type_graphql_1.ObjectType({ description: 'User model' }),
        typegoose_1.Index({ name: 'text' }),
        typegoose_1.queryMethod(methods_1.findCoachByEmail),
        typegoose_1.queryMethod(methods_1.findClientByEmail),
        typegoose_1.queryMethod(methods_1.findUserByEmail),
        typegoose_1.queryMethod(methods_1.findUserByToken),
        typegoose_1.queryMethod(methods_1.findUserByEmailAndUserType)
    ], User);
    return User;
})();
exports.User = User;
exports.UserModel = typegoose_1.getModelForClass(User, {
    existingMongoose: mongoose_1.default,
    schemaOptions: { collection: 'users' },
});
//# sourceMappingURL=model.js.map