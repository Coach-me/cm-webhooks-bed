"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const database_1 = require("../database");
const graphqlTestCall_1 = require("../utils/test/graphqlTestCall");
const enums_1 = require("../definitions/enums");
const model_1 = require("../models/users/model");
const createUserMutation = `
mutation CreateUser($data: UserInput!) {
  createUser(data: $data)
    {id, name, email, token, lastLogin, birthday, cellphone, typeAccount, typeAccount, authType}
    }
`;
globals_1.describe('test Users', () => {
    globals_1.beforeAll(async () => {
        await database_1.connect();
        await database_1.dropDatabase();
    });
    globals_1.afterAll(async () => {
        await database_1.disconnectDatabase();
    });
    globals_1.describe('create User', () => {
        globals_1.test('error user exist', async () => {
            const userData = {
                token: '12345678901',
                email: 'test@test.com',
                name: 'test',
                authType: enums_1.AuthType.FB,
                userType: enums_1.UserType.CO,
            };
            await model_1.UserModel.create(Object.assign(Object.assign({}, userData), { lastLogin: new Date() }));
            const response = await graphqlTestCall_1.graphqlTestCall({
                source: createUserMutation,
                variableValues: {
                    data: Object.assign(Object.assign({}, userData), { authType: 'FB', userType: 'CO' }),
                },
            });
            globals_1.expect(response.errors[0].extensions.key).toBe(1);
        });
    });
});
//# sourceMappingURL=user.spec.js.map