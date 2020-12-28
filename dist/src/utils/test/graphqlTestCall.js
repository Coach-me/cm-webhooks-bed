"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlTestCall = void 0;
const graphql_1 = require("graphql");
const type_graphql_1 = require("type-graphql");
const resolvers_1 = require("../../resolvers");
let schema;
exports.graphqlTestCall = async ({ source, variableValues }) => {
    if (!schema) {
        schema = await type_graphql_1.buildSchema({
            resolvers: resolvers_1.allResolvers,
            validate: true,
        });
    }
    return graphql_1.graphql({
        schema,
        source,
        variableValues,
    });
};
//# sourceMappingURL=graphqlTestCall.js.map