"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateData = void 0;
const paginateData = (transactions, page) => {
    let limit = 10;
    let start = (page - 1) * 10;
    return transactions.slice(start, start + limit);
};
exports.paginateData = paginateData;
