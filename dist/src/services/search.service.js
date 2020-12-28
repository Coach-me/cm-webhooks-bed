"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const moment_1 = __importDefault(require("moment"));
const lodash_1 = __importDefault(require("lodash"));
const logging_1 = __importDefault(require("../logging"));
const model_1 = require("../models/skill/model");
const model_2 = require("../models/availability/model");
class SearchService {
    async searchCoachesByAvailability(startDate = new Date(), endDate = moment_1.default(new Date()).add(3, 'M').toDate()) {
        try {
            const queryCoach = {};
            let limitDate = new Date(endDate);
            limitDate = new Date(limitDate.setUTCHours(23, 59));
            queryCoach.startDate = { $gte: startDate };
            queryCoach.endDate = { $lte: limitDate };
            queryCoach.deleted = false;
            return await model_2.AvailabilityModel.find(queryCoach).distinct('coachId');
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async sortSearch(sortField, sortType, skills) {
        try {
            const sortFields = ['score'];
            const sortTypes = ['desc'];
            if (sortField && sortType) {
                sortFields.push(sortField);
                sortTypes.push(sortType);
            }
            return lodash_1.default.orderBy(skills, sortFields, sortTypes);
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async searchSkills(skillName, coachName, priceMin, priceMax, ratings, coaches) {
        try {
            const querySkill = {};
            const queryCoach = {};
            querySkill.coachId = { $in: coaches };
            if (priceMin || priceMax) {
                querySkill.price = {};
                if (priceMin) {
                    querySkill.price.$gte = priceMin;
                }
                if (priceMax) {
                    querySkill.price.$lte = priceMax;
                }
            }
            if (skillName) {
                querySkill.$text = { $search: skillName };
            }
            querySkill.deleted = false;
            queryCoach.path = 'coachId';
            if (coachName) {
                queryCoach.match = { $text: { $search: coachName } };
                queryCoach.select = {
                    score: { $meta: 'textScore' },
                };
            }
            let skills = await model_1.SkillModel.find(querySkill, {
                score: { $meta: 'textScore' },
            }).populate(queryCoach);
            skills = lodash_1.default.reject(skills, ['coachId', null]);
            lodash_1.default.forEach(skills, (skill) => {
                const user = skill.coachId;
                // eslint-disable-next-line no-param-reassign
                skill.score += user.score;
            });
            return skills;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async groupByCoach(skills) {
        try {
            return lodash_1.default(skills)
                .groupBy('coachId._id')
                .map((items, coachId) => {
                return {
                    coachId,
                    coachSkills: items,
                };
            })
                .value()
                .map(({ coachSkills }) => {
                return Object.assign(Object.assign({ id: coachSkills[0].coachId._doc._id }, coachSkills[0].coachId._doc), { skills: coachSkills });
            });
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
}
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map