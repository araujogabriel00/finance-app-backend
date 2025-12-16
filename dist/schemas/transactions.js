"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecurringSchema = exports.createTransactionsSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTransactionsSchema = zod_1.default.object({
    avatar: zod_1.default.string().url("Avatar deve ser uma URL válida").optional(),
    name: zod_1.default.string()
        .min(1, "Nome é obrigatório")
        .max(100, "Nome não pode ter mais de 100 caracteres"),
    category: zod_1.default.string()
        .min(1, "Categoria é obrigatória")
        .max(50, "Categoria não pode ter mais de 50 caracteres"),
    date: zod_1.default.string()
        .refine((date) => !isNaN(Date.parse(date)), "Data deve ser uma data válida em formato ISO"),
    amount: zod_1.default.number()
        .positive("Valor deve ser maior que 0")
        .max(999999.99, "Valor máximo é 999.999,99"),
    recurring: zod_1.default.boolean(),
});
exports.getRecurringSchema = zod_1.default.object({
    search: zod_1.default.string().optional(),
    sort: zod_1.default.string().optional(),
});
