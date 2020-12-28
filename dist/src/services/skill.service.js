"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const logging_1 = __importDefault(require("../logging"));
const getMessage_1 = require("../utils/getMessage");
const model_1 = require("../models/skill/model");
const constants_1 = require("../constants");
const user_service_1 = require("./user.service");
const enums_1 = require("../definitions/enums");
class SkillService {
    async validateSkillInput(skillInput) {
        try {
            const coaches = [...new Set(skillInput.map((skill) => skill.coachId))];
            if (coaches.length > 1) {
                await getMessage_1.getMessage(31); // CoachId debe ser el mismo en todos las skills
            }
            const coachId = coaches[0];
            const coachExists = await new user_service_1.UserService().userIdValidation(coachId);
            if (coachExists.userType === enums_1.UserType.US) {
                await getMessage_1.getMessage(8); // No es posible agregar habilidades a un usuario
            }
            const skills = lodash_1.default.uniq(skillInput.map((skill) => skill.name));
            if (skills.length !== skillInput.length) {
                await getMessage_1.getMessage(32); // Debe enviar skills unicas
            }
            const skillExistsCoach = await this.findSkillbyCoach(coachId, false);
            const limitSkills = skillExistsCoach.length === constants_1.skillsMax ||
                skillExistsCoach.length + skillInput.length > constants_1.skillsMax;
            if (limitSkills) {
                await getMessage_1.getMessage(19); // No puede exceder el limite de habilidades permitido
            }
            // eslint-disable-next-line no-restricted-syntax
            for (const skill of skillInput) {
                const { name } = skill;
                // eslint-disable-next-line no-await-in-loop
                await this.findSkillbyNameAndCoach(name, coachId, false);
            }
            return coachId;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async findSkillbyCoach(coachId, deleted) {
        try {
            return await model_1.SkillModel.find().findSkillByCoach(coachId, deleted);
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async findSkillbyNameAndCoach(name, coachId, deleted) {
        try {
            const skillExists = await model_1.SkillModel.find({
                $text: { $search: `"${name}"` },
                coachId,
                deleted,
            }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } });
            if (skillExists.length && skillExists[0].score > 1) {
                await getMessage_1.getMessage(3); // Habilidad Existente
            }
            return skillExists;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
}
exports.SkillService = SkillService;
//# sourceMappingURL=skill.service.js.map