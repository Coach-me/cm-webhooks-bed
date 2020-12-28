"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropDatabase = exports.disconnectDatabase = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("./logging"));
const model_1 = require("./models/users/model");
let database;
exports.connect = async () => {
    // add your own uri below
    const uri = process.env.NODE_ENV === 'test'
        ? process.env.MONGO_TEST
        : process.env.MONGO;
    if (database) {
        return;
    }
    database = mongoose_1.default.connection;
    database.once('open', async () => {
        logging_1.default.info(`db connected --- ${uri}`);
    });
    database.on('error', (error) => {
        logging_1.default.error(error);
    });
    await mongoose_1.default.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
};
exports.disconnectDatabase = async () => {
    if (!database) {
        return;
    }
    await mongoose_1.default.disconnect();
};
exports.dropDatabase = async () => {
    if (!database) {
        return;
    }
    if (process.env.NODE_ENV === 'test') {
        // eslint-disable-next-line no-restricted-syntax
        // await mongoose.connection.db.dropDatabase();
        await model_1.UserModel.collection.drop();
    }
};
//# sourceMappingURL=database.js.map