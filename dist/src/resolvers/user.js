"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_upload_1 = require("graphql-upload");
const lodash_1 = __importDefault(require("lodash"));
const model_1 = require("../models/users/model");
const logging_1 = __importDefault(require("../logging"));
const user_input_1 = require("./types/user-input");
const enums_1 = require("../definitions/enums");
const getMessage_1 = require("../utils/getMessage");
const user_service_1 = require("../services/user.service");
const constants_1 = require("../constants");
const skill_1 = require("./skill");
const instagram_service_1 = require("../services/instagram.service");
const facebook_service_1 = require("../services/facebook.service");
const auth_1 = require("../middleware/auth");
let UserResolver = /** @class */ (() => {
    var UserResolver_1;
    let UserResolver = UserResolver_1 = class UserResolver {
        constructor() {
            this.userService = new user_service_1.UserService();
        }
        async login(token, authType) {
            try {
                const data = await this.userService.tokenValidation(authType, token);
                let [user] = await model_1.UserModel.find()
                    .findUserByToken(token)
                    .sort([['lastLogin', -1]])
                    .limit(1);
                logging_1.default.debug(JSON.stringify(user));
                if (!user) {
                    [user] = await model_1.UserModel.find()
                        .findUserByEmail(data.email)
                        .sort([['lastLogin', -1]])
                        .limit(1);
                    logging_1.default.debug('user data', JSON.stringify(user));
                    if (!user) {
                        const { id } = data, result = __rest(data, ["id"]);
                        return Object.assign(Object.assign({}, result), { token, authType, id: 'no_user' });
                    }
                    user.token = token;
                    user.authType = authType;
                }
                user.lastLogin = new Date();
                user.accessToken = auth_1.createJwt(user.userType);
                return user.save();
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
        async logout({ id }) {
            try {
                const lastLogin = new Date();
                const token = '';
                const userExists = await model_1.UserModel.findByIdAndUpdate(id, { lastLogin });
                if (!userExists) {
                    await getMessage_1.getMessage(11); // ID de usuario no existe
                }
                await model_1.UserModel.updateMany({ token: userExists.token }, { token });
                userExists.token = token;
                return userExists;
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
        async createUser(_a, file) {
            var { email, userType, skills } = _a, restData = __rest(_a, ["email", "userType", "skills"]);
            let userCreated;
            try {
                const lastLogin = new Date();
                const { authType, token } = restData;
                const data = await this.userService.tokenValidation(authType, token);
                if (data.email.toString() !== email.toString()) {
                    await getMessage_1.getMessage(26); // Token y correo no corresponden
                }
                const userExists = await model_1.UserModel.findOne().findUserByEmailAndUserType(email, userType);
                if (userExists) {
                    await getMessage_1.getMessage(1); // Usuario Existente
                }
                await this.userService.bankDataValidation(userType, restData);
                if (userType === enums_1.UserType.CO && !skills.length) {
                    await getMessage_1.getMessage(33); // Para la creacion del coach debe enviar al menos una habilidad
                }
                userCreated = await model_1.UserModel.create(Object.assign({ email,
                    lastLogin,
                    userType }, restData));
                if (userType === enums_1.UserType.CO) {
                    const { interests } = restData;
                    if (!lodash_1.default.isEmpty(interests)) {
                        await getMessage_1.getMessage(34); // No debe enviar intereses para un coach
                    }
                    const skillsInput = lodash_1.default.map(skills, (skill) => {
                        return Object.assign(Object.assign({}, skill), { coachId: userCreated._id });
                    });
                    await new skill_1.SkillResolver().addSkill(skillsInput);
                    await this.userService.getSkills(userCreated);
                }
                new UserResolver_1().addProfilePicture(file, {
                    id: userCreated._id,
                });
                userCreated.profilePicture = true;
                return userCreated.save();
            }
            catch (e) {
                if (userCreated) {
                    await model_1.UserModel.findOneAndDelete({ _id: userCreated.id });
                }
                logging_1.default.error(e);
                throw e;
            }
        }
        async modifyUser(_a) {
            var { id } = _a, restData = __rest(_a, ["id"]);
            try {
                const lastLogin = new Date();
                const userExists = await this.userService.userIdValidation(id);
                const { accountNumber, phoneNumber, accountType, bank, bankAccountType, interests, } = restData;
                const validateBankData = [
                    accountNumber,
                    phoneNumber,
                    accountType,
                    bank,
                    bankAccountType,
                ];
                if (userExists.userType === enums_1.UserType.CO && interests.length) {
                    await getMessage_1.getMessage(34); // No debe enviar intereses para un coach
                }
                if (!lodash_1.default.isEmpty(lodash_1.default.compact(validateBankData))) {
                    await this.userService.bankDataValidation(userExists.userType, restData);
                }
                return await model_1.UserModel.findByIdAndUpdate(id, Object.assign({ lastLogin }, restData), { new: true });
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
        async addProfilePicture({ createReadStream }, { id }) {
            const userExists = await this.userService.userIdValidation(id);
            const key = await this.userService.uploadProfilePicture(id, createReadStream(), constants_1.mimeType, constants_1.folderFullResolution);
            await this.userService.resizeProfilePicture(id, key);
            userExists.profilePicture = true;
            return userExists.save();
        }
        async searchInfoUser({ id }) {
            try {
                const userExists = await this.userService.userIdValidation(id);
                if (userExists.userType === enums_1.UserType.CO) {
                    await this.userService.getSkills(userExists);
                }
                return userExists;
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
        async addInstagramProfile(id, token) {
            try {
                const userExists = await this.userService.userIdValidation(id);
                const data = await new instagram_service_1.InstagramService()
                    .getUserByToken(constants_1.fieldsInstagramLink, token)
                    .catch(async () => {
                    await getMessage_1.getMessage(5); // Token invalido
                });
                userExists.instagramProfile = `${constants_1.instagram}${data.username}`;
                return userExists.save();
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
        async addFacebookProfile(id, token) {
            try {
                const userExists = await this.userService.userIdValidation(id);
                const data = await new facebook_service_1.FacebookService()
                    .getUserByToken(constants_1.fieldsFacebookLink, token)
                    .catch(async () => {
                    await getMessage_1.getMessage(5); // Token invalido
                });
                userExists.facebookProfile = data.link;
                return userExists.save();
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
        async addLinkedinProfile(id, username) {
            try {
                const userExists = await this.userService.userIdValidation(id);
                /* const data = await new LinkedinService()
                  .getUserByToken(fieldsLinkedLink, token)
                  .catch(async () => {
                    await getMessage(5); // Token invalido
                  }); */
                userExists.linkedinProfile = `${constants_1.linkedin}${username}`;
                return userExists.save();
            }
            catch (e) {
                logging_1.default.error(e);
                throw e;
            }
        }
    };
    __decorate([
        type_graphql_1.Mutation(() => model_1.User, { nullable: false }),
        __param(0, type_graphql_1.Arg('token')),
        __param(1, type_graphql_1.Arg('authType', () => enums_1.AuthType)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "login", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.User, { nullable: false }),
        __param(0, type_graphql_1.Arg('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [user_input_1.UserIdInput]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "logout", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.User, { nullable: false }),
        __param(0, type_graphql_1.Arg('data')),
        __param(1, type_graphql_1.Arg('file', () => graphql_upload_1.GraphQLUpload, { nullable: true })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [user_input_1.UserInput,
            user_input_1.File]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "createUser", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.User, { nullable: false }),
        __param(0, type_graphql_1.Arg('data')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [user_input_1.UserModifyInput]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "modifyUser", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.User),
        __param(0, type_graphql_1.Arg('file', () => graphql_upload_1.GraphQLUpload)),
        __param(1, type_graphql_1.Arg('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [user_input_1.File,
            user_input_1.UserIdInput]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "addProfilePicture", null);
    __decorate([
        type_graphql_1.Query(() => model_1.User, { nullable: false }),
        __param(0, type_graphql_1.Arg('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [user_input_1.UserIdInput]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "searchInfoUser", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.User, { nullable: false }),
        __param(0, type_graphql_1.Arg('id')),
        __param(1, type_graphql_1.Arg('token')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "addInstagramProfile", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.User, { nullable: false }),
        __param(0, type_graphql_1.Arg('id')),
        __param(1, type_graphql_1.Arg('token')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "addFacebookProfile", null);
    __decorate([
        type_graphql_1.Mutation(() => model_1.User, { nullable: false }),
        __param(0, type_graphql_1.Arg('id')),
        __param(1, type_graphql_1.Arg('username')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], UserResolver.prototype, "addLinkedinProfile", null);
    UserResolver = UserResolver_1 = __decorate([
        type_graphql_1.Resolver()
    ], UserResolver);
    return UserResolver;
})();
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map