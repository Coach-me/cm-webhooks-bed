"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
require('dotenv-safe').config();
const config = {
    s3: {
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
        },
        region: process.env.AWS_S3_REGION,
        params: {
            Bucket: process.env.AWS_S3_BUCKET,
        },
    },
};
exports.s3 = new aws_sdk_1.default.S3(config.s3);
//# sourceMappingURL=s3.js.map