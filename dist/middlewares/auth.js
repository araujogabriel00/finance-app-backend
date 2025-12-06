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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const unauthorized_1 = require("../exceptions/unauthorized");
const root_1 = require("../exceptions/root");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const __1 = require("..");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    try {
        if (!token)
            throw new unauthorized_1.UnauthorizedException("Unauthorized Request", root_1.ErrorCodes.UNAUTHORIZED_REQUEST);
        token = token.split(" ")[1];
        console.log(token);
        const payload = jsonwebtoken_1.default.verify(token, process_1.env.JWT_SECRET);
        const user = yield __1.prismaClient.user.findFirst({
            where: { id: +payload },
        });
        if (!user)
            throw new unauthorized_1.UnauthorizedException("Unauthorized Request", root_1.ErrorCodes.UNAUTHORIZED_REQUEST);
        req.user = user;
        next();
    }
    catch (err) {
        next(new unauthorized_1.UnauthorizedException("Unauthorized Request", root_1.ErrorCodes.UNAUTHORIZED_REQUEST));
    }
});
exports.authMiddleware = authMiddleware;
