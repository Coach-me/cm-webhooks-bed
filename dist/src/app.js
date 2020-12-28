"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const requestLogging_1 = __importDefault(require("./middleware/requestLogging"));
const Error_1 = require("./middleware/Error");
const logging_1 = __importDefault(require("./logging"));
const resolvers_1 = require("./resolvers");
const auth_1 = require("./middleware/auth");
const application = async () => {
    const app = express_1.default();
    const schema = await type_graphql_1.buildSchema({
        resolvers: resolvers_1.allResolvers,
        globalMiddlewares: [Error_1.ErrorInterceptor],
        emitSchemaFile: true,
        authChecker: auth_1.customAuthChecker,
        validate: true,
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        formatError: (error) => {
            logging_1.default.error(`${JSON.stringify(error)}`);
            return error;
        },
        context: ({ req, res }) => {
            const context = {
                req,
                res,
            };
            return context;
        },
    });
    server.applyMiddleware({ app });
    app.use(requestLogging_1.default);
    app.use(body_parser_1.default.json());
    return app;
};
exports.default = application;
//# sourceMappingURL=app.js.map