"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
const client_1 = require("@prisma/client");
const error_1 = require("./middlewares/error");
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process_1.env.CORS_ORIGIN,
    methods: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
    allowedHeaders: "Authorization, Content-Type",
}));
// Preflight request handling
app.options("*", (0, cors_1.default)());
app.use(express_1.default.json());
exports.prismaClient = new client_1.PrismaClient({
    log: ["query"],
});
app.use("/api/v1/budgets", routes_1.budgetRouter);
app.use("/api/v1/auth", routes_1.authRouter);
app.use("/api/v1/pots", routes_1.potsRouter);
app.use("/api/v1/transactions", routes_1.transactionRouter);
/* Catches any errors thrown from our routes */
app.use(error_1.errorMiddleware);
app.listen(process_1.env.PORT, () => {
    console.log("Server running and listening on port 3000");
});
