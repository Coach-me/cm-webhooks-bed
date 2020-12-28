"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callHttp = void 0;
const https = __importStar(require("https"));
const http = __importStar(require("http"));
const axios_1 = __importDefault(require("axios"));
const logging_1 = __importDefault(require("../logging"));
exports.callHttp = axios_1.default.create({
    // 60 sec timeout
    timeout: 60000,
    // keepAlive pools and reuses TCP connections, so it's faster
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true }),
    // follow up to 10 HTTP 3xx redirects
    maxRedirects: 10,
    // cap the maximum content length we'll accept to 50MBs, just in case
    maxContentLength: 50 * 1000 * 1000,
});
exports.callHttp.interceptors.request.use((config) => {
    const { url, data, method } = config;
    logging_1.default.info(`url - ${url} method - ${method} data - ${data}`);
    return config;
}, (error) => {
    logging_1.default.error(error);
    return Promise.reject(error);
});
exports.callHttp.interceptors.response.use((response) => {
    const { status, config: { url, method, data }, } = response;
    logging_1.default.info(`status -- ${status} --- url- ${url} method- ${method} data- ${data}`);
    return response;
}, (error) => {
    logging_1.default.error(error);
    return Promise.reject(error);
});
//# sourceMappingURL=http.js.map