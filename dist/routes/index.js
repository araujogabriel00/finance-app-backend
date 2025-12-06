"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = exports.authRouter = exports.potsRouter = exports.budgetRouter = void 0;
const budgets_1 = __importDefault(require("./budgets"));
exports.budgetRouter = budgets_1.default;
const pots_1 = __importDefault(require("./pots"));
exports.potsRouter = pots_1.default;
const auth_1 = __importDefault(require("./auth"));
exports.authRouter = auth_1.default;
const transactions_1 = __importDefault(require("./transactions"));
exports.transactionRouter = transactions_1.default;
