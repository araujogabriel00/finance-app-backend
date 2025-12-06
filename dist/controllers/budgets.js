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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBudgets = exports.updateBudgets = exports.createBudgets = exports.getBudgets = void 0;
const budgets_1 = require("../schemas/budgets");
const __1 = require("..");
const decimal_js_1 = __importDefault(require("decimal.js"));
const getBudgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const budgets = yield __1.prismaClient.budget.findMany({ where: { userId: id } });
    res.json(budgets);
});
exports.getBudgets = getBudgets;
const createBudgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    budgets_1.createBudgetSchema.parse(req.body);
    const id = req.user.id;
    if (id === 1) {
        return res.status(200).json({ message: "Skipping demo account" });
    }
    const transactions = yield __1.prismaClient.transaction.findMany({
        where: {
            category: req.body.category,
        },
    });
    const spent = transactions
        .filter((transaction) => +transaction.amount < 0)
        .reduce((a, b) => a.abs().plus(new decimal_js_1.default(b.amount).abs()), new decimal_js_1.default(0));
    const budget = yield __1.prismaClient.budget.create({
        data: Object.assign(Object.assign({}, req.body), { userId: id, spent }),
    });
    res.status(200).json(budget);
});
exports.createBudgets = createBudgets;
const updateBudgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    budgets_1.updateBudgetSchema.parse(req.body);
    const budgetId = req.params.id;
    const userId = req.user.id;
    if (userId === 1) {
        return res.status(200).json({ message: "Skipping demo account" });
    }
    const budget = yield __1.prismaClient.budget.update({
        where: {
            id: +budgetId,
            userId,
        },
        data: Object.assign({}, req.body),
    });
    res.status(200).json(budget);
});
exports.updateBudgets = updateBudgets;
const deleteBudgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const budgetId = req.params.id;
    const userId = req.user.id;
    if (userId === 1) {
        return res.status(200).json({ message: "Skipping demo account" });
    }
    const budget = yield __1.prismaClient.budget.delete({
        where: {
            id: +budgetId,
            userId,
        },
    });
    res.json(budget);
});
exports.deleteBudgets = deleteBudgets;
