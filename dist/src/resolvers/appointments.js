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
exports.AppointmentsResolver = void 0;
const type_graphql_1 = require("type-graphql");
const model_1 = require("../models/appointments/model");
const appointments_input_1 = require("./types/appointments-input");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let AppointmentsResolver = /** @class */ (() => {
    let AppointmentsResolver = class AppointmentsResolver {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async returnSingleAppointment(id) {
            return model_1.AppointmentsModel.findById({ _id: id });
        }
        async returnAppointmentsByCoach(coach) {
            return model_1.AppointmentsModel.find({ coach }).populate('coach');
        }
        async createAppointment({ date, coach, time }) {
            return (await model_1.AppointmentsModel.create({
                date,
                coach,
                time,
            })).save();
        }
        async deleteAppointment(id) {
            await model_1.AppointmentsModel.deleteOne({ id });
            return true;
        }
    };
    __decorate([
        type_graphql_1.Query((_returns) => model_1.Appointments, { nullable: false }),
        __param(0, type_graphql_1.Arg('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], AppointmentsResolver.prototype, "returnSingleAppointment", null);
    __decorate([
        type_graphql_1.Query(() => [model_1.Appointments]),
        __param(0, type_graphql_1.Arg('coach')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], AppointmentsResolver.prototype, "returnAppointmentsByCoach", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.Appointments),
        __param(0, type_graphql_1.Arg('data')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [appointments_input_1.AppointmentsInput]),
        __metadata("design:returntype", Promise)
    ], AppointmentsResolver.prototype, "createAppointment", null);
    __decorate([
        type_graphql_1.Mutation(() => Boolean),
        __param(0, type_graphql_1.Arg('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], AppointmentsResolver.prototype, "deleteAppointment", null);
    AppointmentsResolver = __decorate([
        type_graphql_1.Resolver((_of) => model_1.Appointments)
    ], AppointmentsResolver);
    return AppointmentsResolver;
})();
exports.AppointmentsResolver = AppointmentsResolver;
//# sourceMappingURL=appointments.js.map