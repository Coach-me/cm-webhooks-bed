"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = exports.BankAccountType = exports.SortType = exports.SortField = exports.Day = exports.UserType = exports.AuthType = void 0;
const type_graphql_1 = require("type-graphql");
var AuthType;
(function (AuthType) {
    AuthType["FB"] = "Facebook";
    AuthType["GO"] = "Google";
})(AuthType = exports.AuthType || (exports.AuthType = {}));
type_graphql_1.registerEnumType(AuthType, {
    name: 'AuthType',
    description: 'Authentication type',
});
var UserType;
(function (UserType) {
    UserType["CO"] = "Coach";
    UserType["US"] = "Usuario";
})(UserType = exports.UserType || (exports.UserType = {}));
type_graphql_1.registerEnumType(UserType, {
    name: 'UserType',
    description: 'User type',
});
var Day;
(function (Day) {
    Day["LUN"] = "0";
    Day["MAR"] = "1";
    Day["MIE"] = "2";
    Day["JUE"] = "3";
    Day["VIE"] = "4";
    Day["SAB"] = "5";
    Day["DOM"] = "6";
})(Day = exports.Day || (exports.Day = {}));
type_graphql_1.registerEnumType(Day, {
    name: 'Day',
    description: 'Day',
});
var SortField;
(function (SortField) {
    SortField["PRI"] = "price";
    SortField["RAT"] = "ratings";
})(SortField = exports.SortField || (exports.SortField = {}));
type_graphql_1.registerEnumType(SortField, {
    name: 'SortField',
    description: 'SortField',
});
var SortType;
(function (SortType) {
    SortType["ASC"] = "asc";
    SortType["DES"] = "desc";
})(SortType = exports.SortType || (exports.SortType = {}));
type_graphql_1.registerEnumType(SortType, {
    name: 'SortType',
    description: 'SortType',
});
var BankAccountType;
(function (BankAccountType) {
    BankAccountType["BAN"] = "Banco";
    BankAccountType["MOB"] = "Movil";
})(BankAccountType = exports.BankAccountType || (exports.BankAccountType = {}));
type_graphql_1.registerEnumType(BankAccountType, {
    name: 'BankAccountType',
    description: 'BankAccountType',
});
var MessageType;
(function (MessageType) {
    MessageType["ER"] = "error";
    MessageType["WA"] = "warning";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
type_graphql_1.registerEnumType(MessageType, {
    name: 'MessageType',
    description: 'Message type',
});
//# sourceMappingURL=enums.js.map