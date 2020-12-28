"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByToken = exports.findUserByEmailAndUserType = exports.findUserByEmail = exports.findClientByEmail = exports.findCoachByEmail = void 0;
const enums_1 = require("../../definitions/enums");
function findCoachByEmail(email) {
    return this.find({ email, userType: enums_1.UserType.CO });
}
exports.findCoachByEmail = findCoachByEmail;
function findClientByEmail(email) {
    return this.find({ email, userType: enums_1.UserType.US });
}
exports.findClientByEmail = findClientByEmail;
function findUserByEmail(email) {
    return this.find({ email });
}
exports.findUserByEmail = findUserByEmail;
function findUserByEmailAndUserType(email, userType) {
    return this.findOne({ email, userType });
}
exports.findUserByEmailAndUserType = findUserByEmailAndUserType;
function findUserByToken(token) {
    return this.find({ token });
}
exports.findUserByToken = findUserByToken;
//# sourceMappingURL=methods.js.map