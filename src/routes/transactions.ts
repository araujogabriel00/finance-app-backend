import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../errorhandler";
import {
  getTransactions,
  createBatchTransactions,
  getRecurring,
  createTransaction,
} from "../controllers/transactions";

const transactionRouter = Router();

transactionRouter.get("/", errorHandler(getTransactions));
transactionRouter.post("/", [authMiddleware], errorHandler(createTransaction));
transactionRouter.post(
  "/batch",
  [authMiddleware],
  errorHandler(createBatchTransactions)
);
transactionRouter.get("/recurring", errorHandler(getRecurring));

export default transactionRouter;
