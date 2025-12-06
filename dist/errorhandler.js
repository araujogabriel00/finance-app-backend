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
exports.errorHandler = void 0;
const root_1 = require("./exceptions/root");
const internal_1 = require("./exceptions/internal");
const zod_1 = require("zod");
const unprocessable_1 = require("./exceptions/unprocessable");
const errorHandler = (method) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield method(req, res, next);
        }
        catch (err) {
            let exception;
            if (err instanceof root_1.HttpException) {
                exception = err;
            }
            else if (err instanceof zod_1.ZodError) {
                exception = new unprocessable_1.UnprocessableEntity("Unprocessable Entity", root_1.ErrorCodes.UNPROCESSABLE_ENTITY, err.issues);
            }
            else {
                exception = new internal_1.InternalException("An internal error has occurred", root_1.ErrorCodes.INTERNAL_ERROR, err);
            }
            next(exception);
        }
    });
};
exports.errorHandler = errorHandler;
