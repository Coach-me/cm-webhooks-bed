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
exports.DropdownResolver = void 0;
const type_graphql_1 = require("type-graphql");
const model_1 = require("../models/dropdown/model");
const dropdown_input_1 = require("./types/dropdown-input");
const dropdown_service_1 = require("../services/dropdown.service");
let DropdownResolver = /** @class */ (() => {
    let DropdownResolver = class DropdownResolver {
        constructor() {
            this.dropdownService = new dropdown_service_1.DropdownService();
        }
        async dropdownByKey(key) {
            return this.dropdownService.verifyKeyDropdown(key);
        }
        async dropdownByKeyAndValue(key, value) {
            return this.dropdownService.verifyValueDropdown(key, value);
        }
        async allDropdowns() {
            return model_1.DropdownModel.find();
        }
        async createDropdown(dropdown) {
            return model_1.DropdownModel.create(dropdown);
        }
        async addValuesDropdown(dropdown) {
            await this.dropdownService.verifyAddValueDropdown(dropdown.key, dropdown.labelValues);
            return model_1.DropdownModel.findOneAndUpdate({
                key: dropdown.key,
            }, {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                $push: { labelValues: dropdown.labelValues },
            }, { new: true });
        }
        async updateLabelDropdown(key, value, label) {
            return this.dropdownService.updateLabelDropdown(key, value, label);
        }
    };
    __decorate([
        type_graphql_1.Query(() => model_1.Dropdown, { nullable: false }),
        __param(0, type_graphql_1.Arg('key')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], DropdownResolver.prototype, "dropdownByKey", null);
    __decorate([
        type_graphql_1.Query(() => model_1.Dropdown, { nullable: false }),
        __param(0, type_graphql_1.Arg('key')),
        __param(1, type_graphql_1.Arg('value')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], DropdownResolver.prototype, "dropdownByKeyAndValue", null);
    __decorate([
        type_graphql_1.Query(() => [model_1.Dropdown]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], DropdownResolver.prototype, "allDropdowns", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.Dropdown),
        __param(0, type_graphql_1.Arg('dropdown', () => dropdown_input_1.DropdownInput)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [dropdown_input_1.DropdownInput]),
        __metadata("design:returntype", Promise)
    ], DropdownResolver.prototype, "createDropdown", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.Dropdown),
        __param(0, type_graphql_1.Arg('dropdown', () => dropdown_input_1.DropdownInput)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [dropdown_input_1.DropdownInput]),
        __metadata("design:returntype", Promise)
    ], DropdownResolver.prototype, "addValuesDropdown", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.Dropdown),
        __param(0, type_graphql_1.Arg('key')),
        __param(1, type_graphql_1.Arg('value')),
        __param(2, type_graphql_1.Arg('label')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String]),
        __metadata("design:returntype", Promise)
    ], DropdownResolver.prototype, "updateLabelDropdown", null);
    DropdownResolver = __decorate([
        type_graphql_1.Resolver()
    ], DropdownResolver);
    return DropdownResolver;
})();
exports.DropdownResolver = DropdownResolver;
//# sourceMappingURL=dropdown.js.map