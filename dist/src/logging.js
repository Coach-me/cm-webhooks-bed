"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const lodash_1 = __importDefault(require("lodash"));
require('dotenv-safe').config();
const logLevel = process.env.LOG_LEVEL || 'info';
/* This blog post has some good information on configuring winston if you want to customize it.
 * https://thisdavej.com/using-winston-a-versatile-logging-library-for-node-js
 */
const getDetailsFromFile = (fileDetails) => {
    const fileAndRow = fileDetails
        .split('at ')
        .pop()
        .split('(')
        .pop()
        .replace(')', '')
        .split(':');
    const detailsFromFile = {
        file: fileAndRow[0].trim(),
        line: fileAndRow[1],
        row: fileAndRow[2],
        formattedInfos: {},
    };
    detailsFromFile.formattedInfos = Object.keys(detailsFromFile).reduce((previous, key) => `---${previous}-${key}:${detailsFromFile[key]}\n`);
    return detailsFromFile;
};
const appFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.metadata(), winston_1.format.colorize(), winston_1.format.label({
    label: `cm-appointments-bed`,
}), winston_1.format.prettyPrint(), winston_1.format.json(), winston_1.format.printf((info) => {
    var _a;
    const errorStack = (_a = info.metadata) === null || _a === void 0 ? void 0 : _a.stack;
    const _b = info.metadata, { timestamp } = _b, rest = __rest(_b, ["timestamp"]);
    const message = errorStack
        ? info.metadata.nested || info.message
        : info.message;
    return `${info.label} - ${timestamp} - ${info.level} - ${message}${errorStack ? `\n${errorStack}--${getDetailsFromFile(errorStack)}` : ''} ${!lodash_1.default.isEmpty(rest) ? `-${JSON.stringify(rest)}` : ''}`;
}));
const logging = winston_1.createLogger({
    level: logLevel,
    format: appFormat,
    transports: [
        new winston_1.transports.Console(),
    ],
});
exports.default = logging;
//# sourceMappingURL=logging.js.map