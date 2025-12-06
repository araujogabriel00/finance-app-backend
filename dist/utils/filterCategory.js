"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterCategory = void 0;
const filterCategory = (transactions, category) => {
    let data = transactions;
    if (category !== "All Transactions")
        data = data.filter((value) => value.category === category);
    return data;
};
exports.filterCategory = filterCategory;
