"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSkills = exports.validationAccount = exports.validationPhoneNumber = exports.IsValidDropdown = exports.IsValidDropdownConstraint = exports.IsNit = exports.IsNitConstraint = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../definitions/enums");
const model_1 = require("../../models/dropdown/model");
let IsNitConstraint = /** @class */ (() => {
    let IsNitConstraint = class IsNitConstraint {
        validate(IdNumber, args) {
            const objectInput = args.object;
            if (objectInput.idType === 'NIT') {
                const weights = [41, 37, 29, 23, 19, 17, 13, 7, 3];
                let verificationDigit = 0;
                weights.forEach((weight, index) => {
                    // eslint-disable-next-line radix
                    verificationDigit += weight * parseInt(IdNumber.charAt(index));
                });
                verificationDigit %= 11;
                if (verificationDigit >= 2) {
                    verificationDigit = 11 - verificationDigit;
                }
                return IdNumber.charAt(9).toString() === verificationDigit.toString();
            }
            return true;
        }
    };
    IsNitConstraint = __decorate([
        class_validator_1.ValidatorConstraint({ async: true })
    ], IsNitConstraint);
    return IsNitConstraint;
})();
exports.IsNitConstraint = IsNitConstraint;
function IsNit(validationOptions) {
    return function decorator(object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNitConstraint,
        });
    };
}
exports.IsNit = IsNit;
let IsValidDropdownConstraint = /** @class */ (() => {
    let IsValidDropdownConstraint = class IsValidDropdownConstraint {
        validate(value, args) {
            return model_1.DropdownModel.find()
                .findByKeyAndValue(args.constraints[0], value)
                .then((dropdownValue) => {
                return !!dropdownValue;
            });
        }
    };
    IsValidDropdownConstraint = __decorate([
        class_validator_1.ValidatorConstraint({ async: true })
    ], IsValidDropdownConstraint);
    return IsValidDropdownConstraint;
})();
exports.IsValidDropdownConstraint = IsValidDropdownConstraint;
function IsValidDropdown(dropdown, validationOptions) {
    return function decorator(object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [dropdown],
            validator: IsValidDropdownConstraint,
        });
    };
}
exports.IsValidDropdown = IsValidDropdown;
function validationPhoneNumber(object) {
    const input = object;
    if (input.bankAccountType === enums_1.BankAccountType.MOB) {
        input.accountNumber = undefined;
        return true;
    }
    return false;
}
exports.validationPhoneNumber = validationPhoneNumber;
function validationAccount(object) {
    const input = object;
    if (input.bankAccountType === enums_1.BankAccountType.BAN) {
        input.phoneNumber = undefined;
        return true;
    }
    input.accountType = undefined;
    return false;
}
exports.validationAccount = validationAccount;
function validationSkills(object) {
    const input = object;
    if (input.userType === enums_1.UserType.CO) {
        return true;
    }
    input.skills = undefined;
    return false;
}
exports.validationSkills = validationSkills;
//# sourceMappingURL=user-validators.js.map