"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwt = exports.customAuthChecker = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const logging_1 = __importDefault(require("../logging"));
exports.customAuthChecker = ({ root, args, context, info }, roles) => {
    const { authorization } = context.req.headers;
    let role;
    try {
        const token = authorization.split(' ')[1];
        logging_1.default.debug(`token ${token}`);
        const payload = jsonwebtoken_1.verify(token, 'kevinMonoJaimeCoachMeSuperSecret');
        logging_1.default.debug(`payload ${JSON.stringify(payload)}`);
        // eslint-disable-next-line no-param-reassign
        context.payload = payload;
        ({ role } = context.payload);
    }
    catch (err) {
        logging_1.default.debug(`payload ${JSON.stringify(err)}`);
    }
    logging_1.default.debug(`roles ${JSON.stringify(roles)}`);
    logging_1.default.debug(`roles ${JSON.stringify(role)}`);
    return roles.includes(role);
};
exports.createJwt = (role) => {
    return jsonwebtoken_1.sign({
        role,
    }, 'kevinMonoJaimeCoachMeSuperSecret');
};
//# sourceMappingURL=auth.js.map