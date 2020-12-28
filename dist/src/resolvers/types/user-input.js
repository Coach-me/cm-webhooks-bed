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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdInput = exports.UserModifyInput = exports.UserInput = exports.UserInputOptional = exports.File = exports.SkillInputUser = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const stream_1 = require("stream");
const typegoose_1 = require("@typegoose/typegoose");
const enums_1 = require("../../definitions/enums");
const user_validators_1 = require("../validators/user-validators");
const regex_1 = require("../../utils/regex");
const constants_1 = require("../../constants");
const getMessage_1 = require("../../utils/getMessage");
let SkillInputUser = /** @class */ (() => {
    let SkillInputUser = class SkillInputUser {
    };
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.Length(constants_1.nameSkillMin, constants_1.nameSkillMax, {
            message: () => getMessage_1.getMessageSync(35),
        }),
        __metadata("design:type", String)
    ], SkillInputUser.prototype, "name", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
        class_validator_1.IsMongoId({
            message: () => getMessage_1.getMessageSync(36),
        }),
        __metadata("design:type", Object)
    ], SkillInputUser.prototype, "userId", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int),
        __metadata("design:type", Number)
    ], SkillInputUser.prototype, "price", void 0);
    SkillInputUser = __decorate([
        type_graphql_1.InputType()
    ], SkillInputUser);
    return SkillInputUser;
})();
exports.SkillInputUser = SkillInputUser;
let File = /** @class */ (() => {
    let File = class File {
    };
    __decorate([
        type_graphql_1.Field(() => stream_1.Stream),
        __metadata("design:type", Object)
    ], File.prototype, "createReadStream", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], File.prototype, "filename", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], File.prototype, "mimetype", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], File.prototype, "encoding", void 0);
    File = __decorate([
        type_graphql_1.InputType()
    ], File);
    return File;
})();
exports.File = File;
let UserInputOptional = /** @class */ (() => {
    let UserInputOptional = class UserInputOptional {
    };
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.ValidateIf((object) => object.idNumber),
        class_validator_1.IsDefined({
            message: () => getMessage_1.getMessageSync(37),
        }),
        user_validators_1.IsValidDropdown('IdType', {
            message: () => getMessage_1.getMessageSync(38),
        }),
        class_validator_1.Length(constants_1.dropdownValueLen, constants_1.dropdownValueLen, {
            message: () => getMessage_1.getMessageSync(39),
        }),
        __metadata("design:type", String)
    ], UserInputOptional.prototype, "idType", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.ValidateIf((object) => object.idType),
        class_validator_1.IsDefined({
            message: () => getMessage_1.getMessageSync(37),
        }),
        class_validator_1.IsNumberString(),
        user_validators_1.IsNit({
            message: () => getMessage_1.getMessageSync(41),
        }),
        __metadata("design:type", String)
    ], UserInputOptional.prototype, "idNumber", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.IsDate({
            message: () => getMessage_1.getMessageSync(42),
        }),
        __metadata("design:type", Date)
    ], UserInputOptional.prototype, "birthday", void 0);
    __decorate([
        type_graphql_1.Field(() => enums_1.BankAccountType, { nullable: true }),
        class_validator_1.ValidateIf((object) => object.accountNumber || object.phoneNumber || object.accountType),
        class_validator_1.IsDefined({
            message: () => getMessage_1.getMessageSync(37),
        }),
        class_validator_1.IsEnum(enums_1.BankAccountType),
        __metadata("design:type", String)
    ], UserInputOptional.prototype, "bankAccountType", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.ValidateIf((object) => user_validators_1.validationAccount(object)),
        class_validator_1.IsDefined({
            message: () => getMessage_1.getMessageSync(37),
        }),
        user_validators_1.IsValidDropdown('AccountType', {
            message: () => getMessage_1.getMessageSync(38),
        }),
        class_validator_1.Length(constants_1.dropdownValueLen, constants_1.dropdownValueLen, {
            message: () => getMessage_1.getMessageSync(39),
        }),
        __metadata("design:type", String)
    ], UserInputOptional.prototype, "accountType", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.ValidateIf((object) => object.accountNumber || object.phoneNumber || object.accountType),
        class_validator_1.IsDefined({
            message: () => getMessage_1.getMessageSync(37),
        }),
        user_validators_1.IsValidDropdown('Bank', {
            message: () => getMessage_1.getMessageSync(38),
        }),
        class_validator_1.Length(constants_1.dropdownValueLen, constants_1.dropdownValueLen, {
            message: () => getMessage_1.getMessageSync(39),
        }),
        __metadata("design:type", String)
    ], UserInputOptional.prototype, "bank", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.ValidateIf((object) => user_validators_1.validationAccount(object)),
        class_validator_1.IsDefined({
            message: () => getMessage_1.getMessageSync(37),
        }),
        class_validator_1.MaxLength(constants_1.accountNumberMax, {
            message: () => getMessage_1.getMessageSync(40),
        }),
        class_validator_1.IsNumberString({}, {
            message: () => getMessage_1.getMessageSync(43),
        }),
        __metadata("design:type", String)
    ], UserInputOptional.prototype, "accountNumber", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.ValidateIf((object) => user_validators_1.validationPhoneNumber(object)),
        class_validator_1.IsDefined({
            message: () => getMessage_1.getMessageSync(37),
        }),
        class_validator_1.Matches(regex_1.mobilePhoneRegex, {
            message: () => getMessage_1.getMessageSync(44),
        }),
        __metadata("design:type", String)
    ], UserInputOptional.prototype, "phoneNumber", void 0);
    __decorate([
        type_graphql_1.Field(() => [String], { nullable: true }),
        typegoose_1.prop({ type: Array, required: false }),
        class_validator_1.ArrayMaxSize(constants_1.insterestsMaxLen, {
            message: () => getMessage_1.getMessageSync(45),
        }),
        __metadata("design:type", String)
    ], UserInputOptional.prototype, "interests", void 0);
    UserInputOptional = __decorate([
        type_graphql_1.InputType()
    ], UserInputOptional);
    return UserInputOptional;
})();
exports.UserInputOptional = UserInputOptional;
let UserInput = /** @class */ (() => {
    let UserInput = class UserInput extends UserInputOptional {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], UserInput.prototype, "token", void 0);
    __decorate([
        type_graphql_1.Field(() => enums_1.AuthType),
        class_validator_1.IsEnum(enums_1.AuthType, {
            message: () => getMessage_1.getMessageSync(46),
        }),
        __metadata("design:type", String)
    ], UserInput.prototype, "authType", void 0);
    __decorate([
        type_graphql_1.Field(() => enums_1.UserType),
        class_validator_1.IsEnum(enums_1.UserType, {
            message: () => getMessage_1.getMessageSync(46),
        }),
        __metadata("design:type", String)
    ], UserInput.prototype, "userType", void 0);
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.Length(constants_1.nameUserMin, constants_1.nameUserMax, {
            message: () => getMessage_1.getMessageSync(47),
        }),
        __metadata("design:type", String)
    ], UserInput.prototype, "name", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.ValidateIf((object) => object.userType === enums_1.UserType.CO),
        class_validator_1.IsDefined({
            message: () => getMessage_1.getMessageSync(48),
        }),
        class_validator_1.Matches(regex_1.mobilePhoneRegex, {
            message: () => getMessage_1.getMessageSync(44),
        }),
        __metadata("design:type", String)
    ], UserInput.prototype, "cellphone", void 0);
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.IsEmail({}, {
            message: () => getMessage_1.getMessageSync(49),
        }),
        __metadata("design:type", String)
    ], UserInput.prototype, "email", void 0);
    __decorate([
        type_graphql_1.Field(() => [SkillInputUser], { nullable: true }),
        class_validator_1.ValidateIf((object) => user_validators_1.validationSkills(object)),
        class_validator_1.IsDefined({
            message: () => getMessage_1.getMessageSync(50),
        }),
        class_validator_1.ValidateNested(),
        __metadata("design:type", Array)
    ], UserInput.prototype, "skills", void 0);
    UserInput = __decorate([
        type_graphql_1.InputType()
    ], UserInput);
    return UserInput;
})();
exports.UserInput = UserInput;
let UserModifyInput = /** @class */ (() => {
    let UserModifyInput = class UserModifyInput extends UserInputOptional {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        class_validator_1.IsMongoId({
            message: () => getMessage_1.getMessageSync(36),
        }),
        __metadata("design:type", String)
    ], UserModifyInput.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.Length(constants_1.nameUserMin, constants_1.nameUserMax, {
            message: () => getMessage_1.getMessageSync(47),
        }),
        __metadata("design:type", String)
    ], UserModifyInput.prototype, "name", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.Matches(regex_1.mobilePhoneRegex, {
            message: () => getMessage_1.getMessageSync(44),
        }),
        __metadata("design:type", String)
    ], UserModifyInput.prototype, "cellphone", void 0);
    UserModifyInput = __decorate([
        type_graphql_1.InputType()
    ], UserModifyInput);
    return UserModifyInput;
})();
exports.UserModifyInput = UserModifyInput;
let UserIdInput = /** @class */ (() => {
    let UserIdInput = class UserIdInput {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        class_validator_1.IsMongoId({
            message: () => getMessage_1.getMessageSync(36),
        }),
        __metadata("design:type", String)
    ], UserIdInput.prototype, "id", void 0);
    UserIdInput = __decorate([
        type_graphql_1.InputType()
    ], UserIdInput);
    return UserIdInput;
})();
exports.UserIdInput = UserIdInput;
//# sourceMappingURL=user-input.js.map