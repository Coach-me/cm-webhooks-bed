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
exports.AppointmentsModel = exports.Appointments = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const model_1 = require("../coach/model");
let Appointments = /** @class */ (() => {
    let Appointments = class Appointments {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        __metadata("design:type", String)
    ], Appointments.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", String)
    ], Appointments.prototype, "time", void 0);
    __decorate([
        type_graphql_1.Field((_type) => String),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Date)
    ], Appointments.prototype, "date", void 0);
    __decorate([
        type_graphql_1.Field((_type) => model_1.Coach),
        typegoose_1.prop({ ref: model_1.Coach }),
        __metadata("design:type", Object)
    ], Appointments.prototype, "coach", void 0);
    Appointments = __decorate([
        type_graphql_1.ObjectType({ description: 'The Appointments model' })
    ], Appointments);
    return Appointments;
})();
exports.Appointments = Appointments;
exports.AppointmentsModel = typegoose_1.getModelForClass(Appointments, {
    existingMongoose: mongoose_1.default,
    schemaOptions: { collection: 'appointments' },
});
//# sourceMappingURL=model.js.map