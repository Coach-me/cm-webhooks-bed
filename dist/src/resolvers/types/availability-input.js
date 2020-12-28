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
exports.AvailabilityInput = exports.AvailabilityCreateInput = exports.Time = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../definitions/enums");
const getMessage_1 = require("../../utils/getMessage");
let Time = /** @class */ (() => {
    let Time = class Time {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int),
        class_validator_1.Min(0, {
            message: () => getMessage_1.getMessageSync(52),
        }),
        class_validator_1.Max(23, {
            message: () => getMessage_1.getMessageSync(53),
        }),
        __metadata("design:type", Number)
    ], Time.prototype, "timeStartHour", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int),
        class_validator_1.Min(0, {
            message: () => getMessage_1.getMessageSync(54),
        }),
        class_validator_1.Max(59, {
            message: () => getMessage_1.getMessageSync(55),
        }),
        __metadata("design:type", Number)
    ], Time.prototype, "timeStartMin", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int),
        class_validator_1.Min(0, {
            message: () => getMessage_1.getMessageSync(52),
        }),
        class_validator_1.Max(23, {
            message: () => getMessage_1.getMessageSync(53),
        }),
        __metadata("design:type", Number)
    ], Time.prototype, "timeEndHour", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int),
        class_validator_1.Min(0, {
            message: () => getMessage_1.getMessageSync(54),
        }),
        class_validator_1.Max(59, {
            message: () => getMessage_1.getMessageSync(55),
        }),
        __metadata("design:type", Number)
    ], Time.prototype, "timeEndMin", void 0);
    Time = __decorate([
        type_graphql_1.InputType()
    ], Time);
    return Time;
})();
exports.Time = Time;
let AvailabilityCreateInput = /** @class */ (() => {
    let AvailabilityCreateInput = class AvailabilityCreateInput {
    };
    __decorate([
        type_graphql_1.Field(() => [enums_1.Day]),
        class_validator_1.IsArray({
            message: () => getMessage_1.getMessageSync(56),
        }),
        class_validator_1.ArrayUnique({
            message: () => getMessage_1.getMessageSync(57),
        }),
        __metadata("design:type", Array)
    ], AvailabilityCreateInput.prototype, "days", void 0);
    __decorate([
        type_graphql_1.Field(() => [Time]),
        class_validator_1.IsArray({
            message: () => getMessage_1.getMessageSync(56),
        }),
        class_validator_1.ValidateNested(),
        __metadata("design:type", Array)
    ], AvailabilityCreateInput.prototype, "times", void 0);
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.IsDate({
            message: () => getMessage_1.getMessageSync(42),
        }),
        __metadata("design:type", Date)
    ], AvailabilityCreateInput.prototype, "startDate", void 0);
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.IsDate({
            message: () => getMessage_1.getMessageSync(42),
        }),
        __metadata("design:type", Date)
    ], AvailabilityCreateInput.prototype, "endDate", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        class_validator_1.IsMongoId({
            message: () => getMessage_1.getMessageSync(36),
        }),
        __metadata("design:type", Object)
    ], AvailabilityCreateInput.prototype, "coachId", void 0);
    AvailabilityCreateInput = __decorate([
        type_graphql_1.InputType()
    ], AvailabilityCreateInput);
    return AvailabilityCreateInput;
})();
exports.AvailabilityCreateInput = AvailabilityCreateInput;
let AvailabilityInput = /** @class */ (() => {
    let AvailabilityInput = class AvailabilityInput {
    };
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.IsDate({
            message: () => getMessage_1.getMessageSync(42),
        }),
        __metadata("design:type", Date)
    ], AvailabilityInput.prototype, "startDate", void 0);
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.IsDate({
            message: () => getMessage_1.getMessageSync(42),
        }),
        __metadata("design:type", Date)
    ], AvailabilityInput.prototype, "endDate", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        class_validator_1.IsMongoId({
            message: () => getMessage_1.getMessageSync(36),
        }),
        __metadata("design:type", Object)
    ], AvailabilityInput.prototype, "coachId", void 0);
    AvailabilityInput = __decorate([
        type_graphql_1.InputType()
    ], AvailabilityInput);
    return AvailabilityInput;
})();
exports.AvailabilityInput = AvailabilityInput;
//# sourceMappingURL=availability-input.js.map