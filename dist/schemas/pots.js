"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawFundsSchema = exports.addFundsSchema = exports.updatePotsSchema = exports.createPotsSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const themes_1 = require("./themes");
exports.createPotsSchema = zod_1.default.object({
    name: zod_1.default.string().max(30),
    saved: zod_1.default.number().optional(),
    target: zod_1.default.number(),
    theme: themes_1.themeSchema,
});
exports.updatePotsSchema = exports.createPotsSchema;
exports.addFundsSchema = zod_1.default.object({
    saved: zod_1.default.number(),
});
exports.withdrawFundsSchema = exports.addFundsSchema;
