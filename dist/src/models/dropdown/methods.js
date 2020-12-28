"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByKeyAndValue = exports.findByKey = void 0;
function findByKey(key) {
    return this.findOne({ key });
}
exports.findByKey = findByKey;
function findByKeyAndValue(key, value) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return this.findOne({ key, labelValues: { $elemMatch: { value } } });
}
exports.findByKeyAndValue = findByKeyAndValue;
//# sourceMappingURL=methods.js.map