"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const database_1 = require("../database");
const graphqlTestCall_1 = require("../utils/test/graphqlTestCall");
const createCoachMutation = `
mutation CreateCoach($data: CoachInput!) {
  createCoach(data: $data)
    {id, name, typeAccount, email}
    }
`;
globals_1.describe('test coaches', () => {
    globals_1.beforeAll(async () => {
        await database_1.connect();
        await database_1.dropDatabase();
    });
    globals_1.afterAll(async () => {
        await database_1.disconnectDatabase();
    });
    globals_1.describe('create coach', () => {
        globals_1.test('Success', async () => {
            const reponse = await graphqlTestCall_1.graphqlTestCall({
                source: createCoachMutation,
                variableValues: {
                    data: {
                        typeAccount: 'Nequi',
                        email: 'mono@jaime.com',
                        name: 'mono',
                    },
                },
            });
            globals_1.expect(reponse.data.createCoach.name).toBe('mono');
        });
    });
});
//# sourceMappingURL=coach.spec.js.map