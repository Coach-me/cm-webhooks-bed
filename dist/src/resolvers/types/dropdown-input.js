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
exports.DropdownInput = exports.LabelValueInput = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../constants");
const getMessage_1 = require("../../utils/getMessage");
let LabelValueInput = /** @class */ (() => {
    let LabelValueInput = class LabelValueInput {
    };
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], LabelValueInput.prototype, "label", void 0);
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.Length(constants_1.dropdownValueLen, constants_1.dropdownValueLen, {
            message: () => getMessage_1.getMessageSync(39),
        }),
        __metadata("design:type", String)
    ], LabelValueInput.prototype, "value", void 0);
    LabelValueInput = __decorate([
        type_graphql_1.InputType()
    ], LabelValueInput);
    return LabelValueInput;
})();
exports.LabelValueInput = LabelValueInput;
let DropdownInput = /** @class */ (() => {
    let DropdownInput = class DropdownInput {
    };
    __decorate([
        type_graphql_1.Field(),
        class_validator_1.IsAlpha('es-ES', {
            message: () => getMessage_1.getMessageSync(51),
        }),
        __metadata("design:type", String)
    ], DropdownInput.prototype, "key", void 0);
    __decorate([
        type_graphql_1.Field(() => [LabelValueInput]),
        typegoose_1.prop({ type: Array, required: true }),
        class_validator_1.ValidateNested(),
        __metadata("design:type", LabelValueInput)
    ], DropdownInput.prototype, "labelValues", void 0);
    DropdownInput = __decorate([
        type_graphql_1.InputType()
    ], DropdownInput);
    return DropdownInput;
})();
exports.DropdownInput = DropdownInput;
//# sourceMappingURL=dropdown-input.js.map