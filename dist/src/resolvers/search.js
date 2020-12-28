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
exports.SearchResolver = void 0;
const type_graphql_1 = require("type-graphql");
const logging_1 = __importDefault(require("../logging"));
const search_input_1 = require("./types/search-input");
const model_1 = require("../models/users/model");
const search_service_1 = require("../services/search.service");
let SearchResolver = /** @class */ (() => {
    let SearchResolver = class SearchResolver {
        constructor() {
            this.searchService = new search_service_1.SearchService();
        }
        async search({ skillName, coachName, priceMin, priceMax, ratings, availabilityStartDate, availabilityEndDate, sortField, sortType, }) {
            try {
                const coaches = await this.searchService.searchCoachesByAvailability(availabilityStartDate, availabilityEndDate);
                let skills = await this.searchService.searchSkills(skillName, coachName, priceMin, priceMax, ratings, coaches);
                if (!skills.length) {
                    skills = await this.searchService.searchSkills('', skillName, priceMin, priceMax, ratings, coaches);
                }
                const skillsSorted = await this.searchService.sortSearch(sortField, sortType, skills);
                return await this.searchService.groupByCoach(skillsSorted);
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
    };
    __decorate([
        type_graphql_1.Query(() => [model_1.User]),
        __param(0, type_graphql_1.Arg('data')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [search_input_1.SearchInput]),
        __metadata("design:returntype", Promise)
    ], SearchResolver.prototype, "search", null);
    SearchResolver = __decorate([
        type_graphql_1.Resolver()
    ], SearchResolver);
    return SearchResolver;
})();
exports.SearchResolver = SearchResolver;
//# sourceMappingURL=search.js.map