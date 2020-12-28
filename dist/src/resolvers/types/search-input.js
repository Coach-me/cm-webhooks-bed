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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../definitions/enums");
const getMessage_1 = require("../../utils/getMessage");
let SearchInput = /** @class */ (() => {
    let SearchInput = class SearchInput {
    };
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        __metadata("design:type", String)
    ], SearchInput.prototype, "skillName", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
        __metadata("design:type", Number)
    ], SearchInput.prototype, "priceMin", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
        __metadata("design:type", Number)
    ], SearchInput.prototype, "priceMax", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        __metadata("design:type", String)
    ], SearchInput.prototype, "coachName", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.IsDate({
            message: () => getMessage_1.getMessageSync(42),
        }),
        __metadata("design:type", Date)
    ], SearchInput.prototype, "availabilityStartDate", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        class_validator_1.IsDate({
            message: () => getMessage_1.getMessageSync(42),
        }),
        __metadata("design:type", Date)
    ], SearchInput.prototype, "availabilityEndDate", void 0);
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
        class_validator_1.Min(0),
        class_validator_1.Max(5),
        __metadata("design:type", Number)
    ], SearchInput.prototype, "ratings", void 0);
    __decorate([
        type_graphql_1.Field(() => enums_1.SortField, { nullable: true }),
        class_validator_1.IsEnum(enums_1.SortField, {
            message: () => getMessage_1.getMessageSync(46),
        }),
        __metadata("design:type", String)
    ], SearchInput.prototype, "sortField", void 0);
    __decorate([
        type_graphql_1.Field(() => enums_1.SortType, { nullable: true }),
        class_validator_1.IsEnum(enums_1.SortType, {
            message: () => getMessage_1.getMessageSync(46),
        }),
        __metadata("design:type", String)
    ], SearchInput.prototype, "sortType", void 0);
    SearchInput = __decorate([
        type_graphql_1.InputType()
    ], SearchInput);
    return SearchInput;
})();
exports.SearchInput = SearchInput;
//# sourceMappingURL=search-input.js.map