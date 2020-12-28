"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByType = exports.findByKey = void 0;
function findByKey(key) {
    return this.findOne({ key });
}
exports.findByKey = findByKey;
function findByType(type) {
    return this.find({ type });
}
exports.findByType = findByType;
//# sourceMappingURL=methods.js.map