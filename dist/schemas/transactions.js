"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecurringSchema = exports.createBatchTransactionsSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createBatchTransactionsSchema = zod_1.default.object({
    avatar: zod_1.default.string(),
    name: zod_1.default.string(),
    category: zod_1.default.string(),
    date: zod_1.default.string(),
    amount: zod_1.default.number(),
    recurring: zod_1.default.boolean(),
});
exports.getRecurringSchema = zod_1.default.object({
    search: zod_1.default.string(),
    sort: zod_1.default.string(),
});
