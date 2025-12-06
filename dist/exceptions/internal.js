"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalException = void 0;
const root_1 = require("./root");
class InternalException extends root_1.HttpException {
    constructor(message, errorcode, error) {
        super(message, errorcode, 500, error);
    }
}
exports.InternalException = InternalException;
