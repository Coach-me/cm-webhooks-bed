"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownService = void 0;
const logging_1 = __importDefault(require("../logging"));
const model_1 = require("../models/dropdown/model");
const getMessage_1 = require("../utils/getMessage");
class DropdownService {
    async updateLabelDropdown(key, value, label) {
        try {
            await this.verifyValueDropdown(key, value);
            const dropdownUpdated = await model_1.DropdownModel.findOneAndUpdate({ key, 'labelValues.value': value }, { $set: { 'labelValues.$.label': label } }, { new: true });
            if (!dropdownUpdated) {
                await getMessage_1.getMessage(29); // Label no actualizado
            }
            return dropdownUpdated;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async verifyKeyDropdown(key) {
        try {
            const dropdown = await model_1.DropdownModel.find().findByKey(key);
            if (!dropdown) {
                await getMessage_1.getMessage(28); // No existe dropdown
            }
            return dropdown;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async verifyValueDropdown(key, value) {
        try {
            const dropdown = await model_1.DropdownModel.find().findByKeyAndValue(key, value);
            if (!dropdown) {
                await getMessage_1.getMessage(23); // No existe valor en dropdown
            }
            return dropdown;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async verifyAddValueDropdown(key, values) {
        try {
            await this.verifyKeyDropdown(key);
            let labelValues = [values];
            labelValues = labelValues.flat();
            let valueExists;
            // eslint-disable-next-line no-restricted-syntax
            for (const value of labelValues) {
                // eslint-disable-next-line no-await-in-loop
                valueExists = await model_1.DropdownModel.find().findByKeyAndValue(key, value.value);
                if (valueExists) {
                    // eslint-disable-next-line no-await-in-loop
                    await getMessage_1.getMessage(27); // Ya existe valor en dropdown
                }
            }
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
}
exports.DropdownService = DropdownService;
//# sourceMappingURL=dropdown.service.js.map