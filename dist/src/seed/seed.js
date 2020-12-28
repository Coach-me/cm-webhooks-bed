"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_seed_1 = __importDefault(require("mongoose-seed"));
const messages_1 = require("./messages");
const dropdowns_1 = require("./dropdowns");
require("reflect-metadata");
require('dotenv-safe').config();
const uri = process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST : process.env.MONGO;
console.log(`----- ${uri} ------`);
const data = [...messages_1.messagesData, ...dropdowns_1.dropdownsData];
// Connect to MongoDB via Mongoose
mongoose_seed_1.default.connect(uri, () => {
    // Clear specified collections
    mongoose_seed_1.default.loadModels([
        './src/models/message/model',
        './src/models/dropdown/model',
    ]);
    mongoose_seed_1.default.clearModels(['Message', 'Dropdown'], () => {
        // Callback to populate DB once collections have been cleared
        mongoose_seed_1.default.populateModels(data, () => {
            mongoose_seed_1.default.disconnect();
        });
    });
});
// Data array containing seed data - documents organized by Model
//# sourceMappingURL=seed.js.map