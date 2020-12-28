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
exports.CoachResolver = void 0;
const type_graphql_1 = require("type-graphql");
const model_1 = require("../models/coach/model");
const coach_input_1 = require("./types/coach-input");
let CoachResolver = /** @class */ (() => {
    let CoachResolver = class CoachResolver {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async returnCoach(id) {
            const coach = await model_1.CoachModel.findById({ _id: id });
            if (!coach) {
                throw new Error('no se encontro');
            }
            return coach;
        }
        async returnAllCoaches() {
            return model_1.CoachModel.find();
        }
        async createCoach({ name, email, accountType }) {
            return (await model_1.CoachModel.create({
                name,
                email,
                accountType,
            })).save();
        }
        async deleteCoach(id) {
            await model_1.CoachModel.deleteOne({ id });
            return true;
        }
    };
    __decorate([
        type_graphql_1.Query((_returns) => model_1.Coach, { nullable: false }),
        __param(0, type_graphql_1.Arg('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], CoachResolver.prototype, "returnCoach", null);
    __decorate([
        type_graphql_1.Query(() => [model_1.Coach]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], CoachResolver.prototype, "returnAllCoaches", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.Coach),
        __param(0, type_graphql_1.Arg('data')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [coach_input_1.CoachInput]),
        __metadata("design:returntype", Promise)
    ], CoachResolver.prototype, "createCoach", null);
    __decorate([
        type_graphql_1.Mutation(() => Boolean),
        __param(0, type_graphql_1.Arg('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], CoachResolver.prototype, "deleteCoach", null);
    CoachResolver = __decorate([
        type_graphql_1.Resolver()
    ], CoachResolver);
    return CoachResolver;
})();
exports.CoachResolver = CoachResolver;
//# sourceMappingURL=coach.js.map