"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDuplicates = void 0;
const removeDuplicates = (array, key) => {
    return array.filter((obj, index, self) => index === self.findIndex((t) => t[key] === obj[key]));
};
exports.removeDuplicates = removeDuplicates;
