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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityResolver = void 0;
const type_graphql_1 = require("type-graphql");
const logging_1 = __importDefault(require("../logging"));
const model_1 = require("../models/availability/model");
const availability_input_1 = require("./types/availability-input");
const getMessage_1 = require("../utils/getMessage");
const availability_service_1 = require("../services/availability.service");
let AvailabilityResolver = /** @class */ (() => {
    let AvailabilityResolver = class AvailabilityResolver {
        constructor() {
            this.availabilityService = new availability_service_1.AvailabilityService();
        }
        async addAvailability({ days, times, coachId, startDate, endDate }) {
            try {
                const start = new Date(startDate);
                await this.availabilityService.datesAvailabilityValidation(startDate, endDate);
                await this.availabilityService.coachValidation(coachId);
                const availability = await this.availabilityService.setAvailability(startDate, endDate, days, times, coachId);
                const createdAvailability = await model_1.AvailabilityModel.create(availability);
                if (!createdAvailability.length) {
                    await getMessage_1.getMessage(20); // Error al guardar disponibildad
                }
                return this.availabilityService.showAvailability(coachId, start, endDate);
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
        async deleteAvailability({ coachId, startDate, endDate }) {
            await this.availabilityService.coachValidation(coachId);
            const limitDate = new Date(endDate.setUTCHours(23, 59));
            const availability = await model_1.AvailabilityModel.updateMany({
                coachId,
                startDate: { $gte: startDate },
                endDate: { $lte: limitDate },
                deleted: false,
            }, { deleted: true });
            if (availability.nModified === 0) {
                await getMessage_1.getMessage(17); // No se encontro disponibilidad para las fechas indicadas
            }
            return true;
        }
        async showAvailability({ coachId, startDate, endDate }) {
            return this.availabilityService.showAvailability(coachId, startDate, endDate);
        }
    };
    __decorate([
        type_graphql_1.Mutation(() => [model_1.AvailabilityOutput]),
        __param(0, type_graphql_1.Arg('data')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [availability_input_1.AvailabilityCreateInput]),
        __metadata("design:returntype", Promise)
    ], AvailabilityResolver.prototype, "addAvailability", null);
    __decorate([
        type_graphql_1.Mutation(() => Boolean),
        __param(0, type_graphql_1.Arg('data')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [availability_input_1.AvailabilityInput]),
        __metadata("design:returntype", Promise)
    ], AvailabilityResolver.prototype, "deleteAvailability", null);
    __decorate([
        type_graphql_1.Query(() => [model_1.AvailabilityOutput]),
        __param(0, type_graphql_1.Arg('data')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [availability_input_1.AvailabilityInput]),
        __metadata("design:returntype", Promise)
    ], AvailabilityResolver.prototype, "showAvailability", null);
    AvailabilityResolver = __decorate([
        type_graphql_1.Resolver()
    ], AvailabilityResolver);
    return AvailabilityResolver;
})();
exports.AvailabilityResolver = AvailabilityResolver;
//# sourceMappingURL=availability.js.map