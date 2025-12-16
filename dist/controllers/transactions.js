"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.getRecurring = exports.createBatchTransactions = exports.getTransactions = void 0;
const unauthorized_1 = require("../exceptions/unauthorized");
const root_1 = require("../exceptions/root");
const transactions_1 = require("../schemas/transactions");
const unprocessable_1 = require("../exceptions/unprocessable");
const __1 = require("..");
const filterCategory_1 = require("../utils/filterCategory");
const paginate_1 = require("../utils/paginate");
const removeDuplicates_1 = require("../utils/removeDuplicates");
const sortRecurring_1 = require("../utils/sortRecurring");
const sortTransactions_1 = require("../utils/sortTransactions");
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    transactions_1.createTransactionsSchema.parse(req.body);
    const transaction = yield __1.prismaClient.transaction.create({
        data: Object.assign(Object.assign({}, req.body), { date: new Date(req.body.date), avatar: req.body.avatar || null })
    });
    res.status(200).json(transaction);
});
exports.createTransaction = createTransaction;
const getTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, category, sort, page } = req.query;
    let transactions = yield __1.prismaClient.transaction.findMany();
    if (search)
        transactions = transactions.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    transactions = (0, filterCategory_1.filterCategory)(transactions, category);
    const totalPages = transactions.length;
    transactions = (0, sortTransactions_1.sortTransactions)(transactions, sort);
    transactions = (0, paginate_1.paginateData)(transactions, +page);
    res.status(200).json({ transactions, totalPages });
    res.status(200).json({ transactions, totalPages: transactions.length });
});
exports.getTransactions = getTransactions;
const createBatchTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(req.body))
        throw new unprocessable_1.UnprocessableEntity("Must contain more than one transaction", root_1.ErrorCodes.NOT_ENOUGH_TRANSACTIONS, null);
    req.body.forEach((obj) => transactions_1.createTransactionsSchema.parse(obj));
    const id = req.user.id;
    if (!(id === 2))
        throw new unauthorized_1.UnauthorizedException("Only Sam can create batch transactions >:(", root_1.ErrorCodes.NOT_SAM);
    const formattedData = req.body.map((item) => (Object.assign(Object.assign({}, item), { date: new Date(item.date), avatar: item.avatar || null })));
    let transactions = yield __1.prismaClient.transaction.createMany({
        data: formattedData,
    });
    res.status(200).json(transactions);
});
exports.createBatchTransactions = createBatchTransactions;
const getRecurring = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    transactions_1.getRecurringSchema.parse(req.query);
    const { search, sort } = req.query;
    let recurring = yield __1.prismaClient.transaction.findMany({
        where: {
            recurring: true,
        },
    });
    /* Remove duplicates */
    recurring = (0, removeDuplicates_1.removeDuplicates)(recurring, "name");
    if (search)
        recurring = recurring.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    recurring = (0, sortRecurring_1.sortBills)(recurring, sort);
    res.json(recurring);
});
exports.getRecurring = getRecurring;
