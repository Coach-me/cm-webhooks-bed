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
exports.SkillModifyInput = exports.SkillInput = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../constants");
const getMessage_1 = require("../../utils/getMessage");
let SkillInput = /** @class */ (() => {
    let SkillInput = class SkillInput {
    };
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.Length(constants_1.nameSkillMin, constants_1.nameSkillMax, {
            message: () => getMessage_1.getMessageSync(35),
        }),
        __metadata("design:type", String)
    ], SkillInput.prototype, "name", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int),
        __metadata("design:type", Number)
    ], SkillInput.prototype, "price", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        class_validator_1.IsMongoId({
            message: () => getMessage_1.getMessageSync(36),
        }),
        __metadata("design:type", Object)
    ], SkillInput.prototype, "coachId", void 0);
    SkillInput = __decorate([
        type_graphql_1.InputType()
    ], SkillInput);
    return SkillInput;
})();
exports.SkillInput = SkillInput;
let SkillModifyInput = /** @class */ (() => {
    let SkillModifyInput = class SkillModifyInput {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        class_validator_1.IsMongoId({
            message: () => getMessage_1.getMessageSync(36),
        }),
        __metadata("design:type", String)
    ], SkillModifyInput.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.Length(constants_1.nameSkillMin, constants_1.nameSkillMax, {
            message: () => getMessage_1.getMessageSync(35),
        }),
        __metadata("design:type", String)
    ], SkillModifyInput.prototype, "name", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
        __metadata("design:type", Number)
    ], SkillModifyInput.prototype, "price", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        class_validator_1.IsMongoId({
            message: () => getMessage_1.getMessageSync(36),
        }),
        __metadata("design:type", Object)
    ], SkillModifyInput.prototype, "coachId", void 0);
    SkillModifyInput = __decorate([
        type_graphql_1.InputType()
    ], SkillModifyInput);
    return SkillModifyInput;
})();
exports.SkillModifyInput = SkillModifyInput;
//# sourceMappingURL=skill-input.js.map