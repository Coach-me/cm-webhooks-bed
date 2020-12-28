"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allResolvers = void 0;
const coach_1 = require("./coach");
const appointments_1 = require("./appointments");
const user_1 = require("./user");
const message_1 = require("./message");
const skill_1 = require("./skill");
const availability_1 = require("./availability");
const dropdown_1 = require("./dropdown");
const search_1 = require("./search");
exports.allResolvers = [
    coach_1.CoachResolver,
    appointments_1.AppointmentsResolver,
    user_1.UserResolver,
    message_1.MessageResolver,
    skill_1.SkillResolver,
    availability_1.AvailabilityResolver,
    dropdown_1.DropdownResolver,
    search_1.SearchResolver,
];
//# sourceMappingURL=index.js.map