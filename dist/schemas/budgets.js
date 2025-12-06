"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBudgetSchema = exports.createBudgetSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const themes_1 = require("./themes");
exports.createBudgetSchema = zod_1.default.object({
    category: zod_1.default.string(),
    spent: zod_1.default.number().optional(),
    max: zod_1.default.number(),
    theme: themes_1.themeSchema,
});
exports.updateBudgetSchema = zod_1.default.object({
    category: zod_1.default.string(),
    max: zod_1.default.number(),
    theme: themes_1.themeSchema,
});
