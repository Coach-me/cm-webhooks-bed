"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const sharp_1 = __importDefault(require("sharp"));
const lodash_1 = __importDefault(require("lodash"));
const logging_1 = __importDefault(require("../logging"));
const getMessage_1 = require("../utils/getMessage");
const enums_1 = require("../definitions/enums");
const model_1 = require("../models/users/model");
const facebook_service_1 = require("./facebook.service");
const google_service_1 = require("./google.service");
const s3_1 = require("../s3");
const constants_1 = require("../constants");
const skill_service_1 = require("./skill.service");
class UserService {
    constructor() {
        this.facebookService = new facebook_service_1.FacebookService();
        this.googleService = new google_service_1.GoogleService();
        this.skillService = new skill_service_1.SkillService();
    }
    async tokenValidation(authType, token) {
        try {
            let data;
            if (authType === enums_1.AuthType.FB) {
                data = await this.facebookService
                    .getUserByToken(constants_1.fieldsFacebookLogin, token)
                    .catch(async () => {
                    await getMessage_1.getMessage(5); // Token invalido
                });
            }
            if (authType === enums_1.AuthType.GO) {
                data = await this.googleService
                    .getUserByToken(constants_1.fieldsGoogleLogin, token)
                    .catch(async () => {
                    await getMessage_1.getMessage(5); // Token invalido
                });
            }
            return data;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async bankDataValidation(userType, restData) {
        try {
            const { accountNumber, phoneNumber, accountType, bank, bankAccountType, } = restData;
            if (userType === enums_1.UserType.CO && (!bank || !bankAccountType)) {
                await getMessage_1.getMessage(7); // Datos bancarios obligatorios
            }
            const validateBankData = [
                accountType,
                bank,
                bankAccountType,
                phoneNumber,
                accountNumber,
            ];
            if (userType === enums_1.UserType.US && !lodash_1.default.isEmpty(lodash_1.default.compact(validateBankData))) {
                await getMessage_1.getMessage(25); // No se debe enviar información bancaria para un usuario
            }
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async userIdValidation(id) {
        try {
            const userExists = await model_1.UserModel.findById(id);
            if (!userExists) {
                await getMessage_1.getMessage(11); // ID user no existe
            }
            return userExists;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async getSkills(user) {
        const coach = user;
        try {
            const deleted = false;
            const skillExists = await this.skillService.findSkillbyCoach(coach.id, deleted);
            if (skillExists.length) {
                skillExists.forEach((skill, index) => {
                    coach.skills[index] = skill;
                });
            }
            return coach;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async uploadProfilePicture(userId, stream, mimetype, resolution) {
        try {
            const key = `${resolution}/${userId}.${mimetype.split('/')[1]}`;
            let s3Object;
            if (process.env.NODE_ENV === 'test') {
                s3Object = await s3_1.s3
                    .upload({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Body: stream,
                    ContentType: mimetype,
                    Key: key,
                    ACL: constants_1.fileACL,
                })
                    .promise();
            }
            if (!s3Object) {
                await getMessage_1.getMessage(30); // Error al guardar foto
            }
            return key;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async getProfilePicture(key) {
        try {
            return await s3_1.s3
                .getObject({ Bucket: process.env.AWS_S3_BUCKET, Key: key })
                .promise();
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async resizeProfilePicture(id, key) {
        try {
            const keys = [];
            const photoObject = await this.getProfilePicture(key);
            // eslint-disable-next-line no-restricted-syntax
            for (const resolution of constants_1.resolutions) {
                sharp_1.default(photoObject.Body)
                    .resize(resolution, resolution)
                    .toFormat('png')
                    .toBuffer()
                    .then(async (buffer) => {
                    const keyPicture = await this.uploadProfilePicture(id, buffer, constants_1.mimeType, resolution);
                    keys.push(keyPicture);
                })
                    .catch((err) => {
                    throw err;
                });
            }
            return keys;
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
    async deleteProfilePicture(keys) {
        try {
            // eslint-disable-next-line no-restricted-syntax
            for (const key of keys) {
                // eslint-disable-next-line no-await-in-loop
                await s3_1.s3
                    .deleteObject({ Bucket: process.env.AWS_S3_BUCKET, Key: key })
                    .promise();
            }
        }
        catch (e) {
            logging_1.default.error(e);
            throw e;
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map