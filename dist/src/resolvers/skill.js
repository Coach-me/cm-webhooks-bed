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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillResolver = void 0;
const type_graphql_1 = require("type-graphql");
const logging_1 = __importDefault(require("../logging"));
const model_1 = require("../models/skill/model");
const skill_input_1 = require("./types/skill-input");
const getMessage_1 = require("../utils/getMessage");
const skill_service_1 = require("../services/skill.service");
const constants_1 = require("../constants");
let SkillResolver = /** @class */ (() => {
    let SkillResolver = class SkillResolver {
        constructor() {
            this.skillService = new skill_service_1.SkillService();
        }
        async addSkill(skillInput) {
            try {
                const coachId = await this.skillService.validateSkillInput(skillInput);
                const skillCreated = await model_1.SkillModel.create(skillInput);
                if (!skillCreated) {
                    await getMessage_1.getMessage(21); // Error al guardar habilidad
                }
                return await this.skillService.findSkillbyCoach(coachId, false);
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
        async modifySkill(_a) {
            var { id, coachId } = _a, restData = __rest(_a, ["id", "coachId"]);
            try {
                const { name } = restData;
                if (name) {
                    await this.skillService.findSkillbyNameAndCoach(name, coachId, false);
                }
                const skillUpdate = await model_1.SkillModel.findOneAndUpdate({ _id: id, coachId, deleted: false }, Object.assign({}, restData), { new: true });
                if (!skillUpdate) {
                    await getMessage_1.getMessage(9); // Habilidad no existe
                }
                return await this.skillService.findSkillbyCoach(coachId, false);
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
        async deleteSkill({ id, coachId }) {
            try {
                const skillExistsCoach = await this.skillService.findSkillbyCoach(coachId, false);
                if (skillExistsCoach.length === constants_1.skillsMin) {
                    await getMessage_1.getMessage(6); // Debe tener al menos una habilidad
                }
                const skillExists = await model_1.SkillModel.findOneAndUpdate({ _id: id, coachId, deleted: false }, { deleted: true }, { new: true });
                if (!skillExists) {
                    await getMessage_1.getMessage(9); // Habilidad no existe
                }
                return await this.skillService.findSkillbyCoach(coachId, false);
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
    };
    __decorate([
        type_graphql_1.Mutation(() => [model_1.Skill]),
        __param(0, type_graphql_1.Arg('data', () => [skill_input_1.SkillInput])),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], SkillResolver.prototype, "addSkill", null);
    __decorate([
        type_graphql_1.Mutation(() => [model_1.Skill]),
        __param(0, type_graphql_1.Arg('data')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [skill_input_1.SkillModifyInput]),
        __metadata("design:returntype", Promise)
    ], SkillResolver.prototype, "modifySkill", null);
    __decorate([
        type_graphql_1.Mutation(() => [model_1.Skill]),
        __param(0, type_graphql_1.Arg('data')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [skill_input_1.SkillModifyInput]),
        __metadata("design:returntype", Promise)
    ], SkillResolver.prototype, "deleteSkill", null);
    SkillResolver = __decorate([
        type_graphql_1.Resolver()
    ], SkillResolver);
    return SkillResolver;
})();
exports.SkillResolver = SkillResolver;
//# sourceMappingURL=skill.js.map