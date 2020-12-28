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
exports.AvailabilityModel = exports.Availability = exports.AvailabilityOutput = exports.TimeOutput = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const methods_1 = require("./methods");
const model_1 = require("../users/model");
let TimeOutput = /** @class */ (() => {
    let TimeOutput = class TimeOutput {
    };
    __decorate([
        type_graphql_1.Field(() => Date, { nullable: false }),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Date)
    ], TimeOutput.prototype, "startTime", void 0);
    __decorate([
        type_graphql_1.Field(() => Date, { nullable: false }),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Date)
    ], TimeOutput.prototype, "endTime", void 0);
    TimeOutput = __decorate([
        type_graphql_1.ObjectType({ description: 'Time model' })
    ], TimeOutput);
    return TimeOutput;
})();
exports.TimeOutput = TimeOutput;
let AvailabilityOutput = /** @class */ (() => {
    let AvailabilityOutput = class AvailabilityOutput {
    };
    __decorate([
        type_graphql_1.Field(() => String, { nullable: true }),
        typegoose_1.prop({ ref: model_1.User, immutable: true, required: true }),
        __metadata("design:type", Object)
    ], AvailabilityOutput.prototype, "coachId", void 0);
    __decorate([
        type_graphql_1.Field(() => Date, { nullable: false }),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Date)
    ], AvailabilityOutput.prototype, "date", void 0);
    __decorate([
        type_graphql_1.Field(() => [TimeOutput], { nullable: false }),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Array)
    ], AvailabilityOutput.prototype, "availability", void 0);
    AvailabilityOutput = __decorate([
        type_graphql_1.ObjectType({ description: 'Availability Calendar model' })
    ], AvailabilityOutput);
    return AvailabilityOutput;
})();
exports.AvailabilityOutput = AvailabilityOutput;
let Availability = /** @class */ (() => {
    let Availability = class Availability {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID, { nullable: true }),
        __metadata("design:type", String)
    ], Availability.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Date)
    ], Availability.prototype, "startDate", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Date)
    ], Availability.prototype, "endDate", void 0);
    __decorate([
        type_graphql_1.Field(() => String, { nullable: true }),
        typegoose_1.prop({ ref: model_1.User, immutable: true, required: true }),
        __metadata("design:type", Object)
    ], Availability.prototype, "coachId", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: true, default: false }),
        __metadata("design:type", Boolean)
    ], Availability.prototype, "deleted", void 0);
    Availability = __decorate([
        type_graphql_1.ObjectType({ description: 'Availability model' }),
        typegoose_1.queryMethod(methods_1.findAvailabilityByCoach)
    ], Availability);
    return Availability;
})();
exports.Availability = Availability;
exports.AvailabilityModel = typegoose_1.getModelForClass(Availability, {
    existingMongoose: mongoose_1.default,
    schemaOptions: { collection: 'availability' },
});
//# sourceMappingURL=model.js.map