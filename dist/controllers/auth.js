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
exports.me = exports.login = exports.signUp = void 0;
const __1 = require("..");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const user_1 = require("../schemas/user");
const not_found_1 = require("../exceptions/not-found");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.signUpSchema.parse(req.body);
    const { name, email, password } = req.body;
    let user = yield __1.prismaClient.user.findFirst({
        where: {
            email,
        },
    });
    if (user)
        throw new bad_request_1.BadRequestException("User already exists", root_1.ErrorCodes.USER_ALREADY_EXISTS);
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    user = yield __1.prismaClient.user.create({
        data: { name, email, password: hashedPassword },
    });
    const token = jsonwebtoken_1.default.sign(user.id.toString(), process_1.env.JWT_SECRET);
    res.status(200).json({ user, token });
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.loginSchema.parse(req.body);
    const { email, password } = req.body;
    const user = yield __1.prismaClient.user.findFirst({ where: { email } });
    if (!user)
        throw new not_found_1.NotFoundException("User does not exist", root_1.ErrorCodes.USER_DOES_NOT_EXIST);
    console.log(user.password, password);
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch)
        throw new bad_request_1.BadRequestException("Passwords don't match", root_1.ErrorCodes.INCORRECT_PASSWORD);
    const token = jsonwebtoken_1.default.sign(user.id.toString(), process_1.env.JWT_SECRET);
    res.status(200).json({ token: token });
});
exports.login = login;
const me = (req, res, next) => {
    console.log(req);
    res.json(req.user);
};
exports.me = me;
