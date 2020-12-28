"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityService = void 0;
const moment_1 = __importDefault(require("moment"));
const logging_1 = __importDefault(require("../logging"));
const model_1 = require("../models/availability/model");
const getMessage_1 = require("../utils/getMessage");
const enums_1 = require("../definitions/enums");
const user_service_1 = require("./user.service");
function setAvailability(date, time, coachId) {
    const startTime = new Date(date.setUTCHours(time.timeStartHour, time.timeStartMin));
    const endTime = new Date(date.setUTCHours(time.timeEndHour, time.timeEndMin));
    if (endTime < startTime) {
        return null;
    }
    const availability = {
        startDate: startTime,
        endDate: endTime,
        coachId,
        deleted: false,
    };
    return availability;
}
class AvailabilityService {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    async coachValidation(coachId) {
        try {
            const coachExists = await this.userService.userIdValidation(coachId);
            if (coachExists.userType === enums_1.UserType.US) {
                await getMessage_1.getMessage(13); // Disponibilidad no es permitida para un usuario
            }
            return coachExists;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async showAvailability(coachId, startDate, endDate) {
        try {
            await this.coachValidation(coachId);
            const limitDate = new Date(endDate.setUTCHours(23, 59));
            const availabilityExists = await model_1.AvailabilityModel.find({
                coachId,
                startDate: { $gte: startDate },
                endDate: { $lte: limitDate },
                deleted: false,
            }).sort([['startDate', 1]]);
            if (!availabilityExists.length) {
                await getMessage_1.getMessage(17); // No se encontro disponibilidad para las fechas indicadas
            }
            let dayDisp = 0;
            let startTime = new Date(0);
            let endTime = new Date(0);
            let timeOutput = [];
            const availabilityLen = availabilityExists.length;
            const availabilityOutput = [];
            availabilityExists.forEach((availability, index) => {
                if (index === 0 || dayDisp !== availability.startDate.getDate()) {
                    if (timeOutput.length || (startTime !== endTime && index !== 0)) {
                        timeOutput.push({
                            startTime,
                            endTime,
                        });
                        availabilityOutput.push({
                            coachId,
                            date: moment_1.default.utc(startTime).startOf('day').toDate(),
                            availability: timeOutput,
                        });
                        timeOutput = [];
                    }
                    dayDisp = availability.startDate.getDate();
                    startTime = availability.startDate;
                    endTime = availability.endDate;
                }
                if (availability.startDate <= endTime) {
                    if (availability.endDate > endTime) {
                        endTime = availability.endDate;
                    }
                }
                else {
                    timeOutput.push({
                        startTime,
                        endTime,
                    });
                    startTime = availability.startDate;
                    endTime = availability.endDate;
                }
                if (index === availabilityLen - 1) {
                    timeOutput.push({
                        startTime,
                        endTime,
                    });
                    availabilityOutput.push({
                        coachId,
                        date: moment_1.default.utc(startTime).startOf('day').toDate(),
                        availability: timeOutput,
                    });
                }
            });
            return availabilityOutput;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async setAvailability(startDate, endDate, days, times, coachId) {
        try {
            const availability = [];
            let getAvailability;
            let daysIn = false;
            while (startDate <= endDate) {
                if (days.find((day) => day.toString() === startDate.getDay().toString())) {
                    daysIn = true;
                    // eslint-disable-next-line no-loop-func
                    times.forEach((time) => {
                        getAvailability = setAvailability(new Date(startDate), time, coachId);
                        if (!getAvailability) {
                            return null;
                        }
                        availability.push(getAvailability);
                        return availability;
                    });
                    if (!getAvailability) {
                        break;
                    }
                }
                startDate.setDate(startDate.getDate() + 1);
            }
            if (!getAvailability && daysIn) {
                await getMessage_1.getMessage(15); // Tiempo de inicio debe ser menor al tiempo final
            }
            if (!availability.length) {
                await getMessage_1.getMessage(12); // Para el rango de fechas y dias de la semana seleccionados no hay ningun dia valido
            }
            return availability;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async datesAvailabilityValidation(startDate, endDate) {
        try {
            const todayDate = moment_1.default(new Date()).subtract(1, 'd').toDate();
            todayDate.setUTCHours(0, 0, 0, 0);
            if (startDate < todayDate) {
                await getMessage_1.getMessage(18); // Fecha de inicio de vigencia de disponibilidad debe ser mayor o igual a la fecha actual
            }
            if (endDate.getTime() - startDate.getTime() < 0) {
                await getMessage_1.getMessage(16); // Fecha inicio disponibilidad debe ser menor a la fecha final
            }
            if (moment_1.default(endDate) > moment_1.default(startDate).add(3, 'M')) {
                await getMessage_1.getMessage(14); // No es posible agendar mas de tres meses
            }
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
}
exports.AvailabilityService = AvailabilityService;
//# sourceMappingURL=availability.service.js.map