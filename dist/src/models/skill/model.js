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
exports.SkillModel = exports.Skill = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const methods_1 = require("./methods");
const model_1 = require("../users/model");
let Skill = /** @class */ (() => {
    let Skill = class Skill {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.ID),
        __metadata("design:type", String)
    ], Skill.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", String)
    ], Skill.prototype, "name", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int),
        typegoose_1.prop({ required: true }),
        __metadata("design:type", Number)
    ], Skill.prototype, "price", void 0);
    __decorate([
        type_graphql_1.Field(() => model_1.User),
        typegoose_1.prop({
            immutable: true,
            required: true,
            ref: model_1.User,
        }),
        __metadata("design:type", Object)
    ], Skill.prototype, "coachId", void 0);
    __decorate([
        type_graphql_1.Field(),
        typegoose_1.prop({ required: true, default: false }),
        __metadata("design:type", Boolean)
    ], Skill.prototype, "deleted", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typegoose_1.prop({ required: false }),
        __metadata("design:type", Number)
    ], Skill.prototype, "score", void 0);
    Skill = __decorate([
        type_graphql_1.ObjectType({ description: 'Skill model' }),
        typegoose_1.Index({ name: 'text' }),
        typegoose_1.queryMethod(methods_1.findSkillByNameAndCoach),
        typegoose_1.queryMethod(methods_1.findSkillByCoach)
    ], Skill);
    return Skill;
})();
exports.Skill = Skill;
exports.SkillModel = typegoose_1.getModelForClass(Skill, {
    existingMongoose: mongoose_1.default,
    schemaOptions: { collection: 'skills' },
});
//# sourceMappingURL=model.js.map