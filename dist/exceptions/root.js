"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super();
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.HttpException = HttpException;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["USER_ALREADY_EXISTS"] = 10001] = "USER_ALREADY_EXISTS";
    ErrorCodes[ErrorCodes["USER_DOES_NOT_EXIST"] = 10002] = "USER_DOES_NOT_EXIST";
    ErrorCodes[ErrorCodes["INCORRECT_PASSWORD"] = 10003] = "INCORRECT_PASSWORD";
    ErrorCodes[ErrorCodes["UNPROCESSABLE_ENTITY"] = 10004] = "UNPROCESSABLE_ENTITY";
    ErrorCodes[ErrorCodes["INTERNAL_ERROR"] = 10005] = "INTERNAL_ERROR";
    ErrorCodes[ErrorCodes["UNAUTHORIZED_REQUEST"] = 10006] = "UNAUTHORIZED_REQUEST";
    ErrorCodes[ErrorCodes["POT_DOES_NOT_EXIST"] = 10007] = "POT_DOES_NOT_EXIST";
    ErrorCodes[ErrorCodes["POT_SAVED_EXCEEDS_TARGET"] = 10008] = "POT_SAVED_EXCEEDS_TARGET";
    ErrorCodes[ErrorCodes["POT_SAVED_CANNOT_BE_NEGATIVE"] = 10009] = "POT_SAVED_CANNOT_BE_NEGATIVE";
    ErrorCodes[ErrorCodes["NOT_SAM"] = 10010] = "NOT_SAM";
    ErrorCodes[ErrorCodes["NOT_ENOUGH_TRANSACTIONS"] = 10011] = "NOT_ENOUGH_TRANSACTIONS";
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
