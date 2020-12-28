"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedinService = void 0;
const http_1 = require("../utils/http");
const logging_1 = __importDefault(require("../logging"));
const constants_1 = require("../constants");
class LinkedinService {
    async getUserByToken(fields, token) {
        try {
            const { data } = await http_1.callHttp(`${constants_1.linkedinBaseUrl}me?fields=${fields}&oauth2_access_token=${token}`);
            logging_1.default.debug(data);
            return data;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
}
exports.LinkedinService = LinkedinService;
//# sourceMappingURL=linkedin.service.js.map