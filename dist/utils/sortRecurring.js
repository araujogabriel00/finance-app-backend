"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortBills = void 0;
const sortBills = (bills, sortValue) => {
    let data = bills;
    if (sortValue === "Latest")
        return data.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate());
    else if (sortValue === "Oldest")
        return data.sort((a, b) => new Date(b.date).getDate() - new Date(a.date).getDate());
    else if (sortValue === "A to Z")
        return data.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortValue === "Z to A")
        return data.sort((a, b) => b.name.localeCompare(a.name));
    else if (sortValue === "Highest")
        return data.sort((a, b) => +a.amount - +b.amount);
    else if (sortValue === "Lowest")
        return (data = data.sort((a, b) => +b.amount - +a.amount));
    return data;
};
exports.sortBills = sortBills;
