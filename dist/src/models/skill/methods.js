"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSkillByCoach = exports.findSkillByNameAndCoach = void 0;
function findSkillByNameAndCoach(name, coachId, deleted) {
    return this.findOne({
        $text: { $search: name },
        coachId,
        deleted,
    });
}
exports.findSkillByNameAndCoach = findSkillByNameAndCoach;
function findSkillByCoach(coachId, deleted) {
    return this.find({
        coachId,
        deleted,
    }).populate('coachId');
}
exports.findSkillByCoach = findSkillByCoach;
//# sourceMappingURL=methods.js.map