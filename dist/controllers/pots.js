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
exports.withdrawFunds = exports.addFunds = exports.deletePot = exports.updatePot = exports.createPot = exports.getPots = void 0;
const pots_1 = require("../schemas/pots");
const __1 = require("..");
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const getPots = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const pots = yield __1.prismaClient.pot.findMany({ where: { userId } });
    res.status(200).json(pots);
});
exports.getPots = getPots;
const createPot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    pots_1.createPotsSchema.parse(req.body);
    const userId = req.user.id;
    if (userId === 1) {
        return res.status(200).json({ message: "Skipping demo account" });
    }
    const pot = yield __1.prismaClient.pot.create({
        data: Object.assign(Object.assign({}, req.body), { userId }),
    });
    res.status(200).json(pot);
});
exports.createPot = createPot;
const updatePot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    pots_1.updatePotsSchema.parse(req.body);
    const userId = req.user.id;
    if (userId === 1) {
        return res.status(200).json({ message: "Skipping demo account" });
    }
    const id = +req.params.id;
    const pot = yield __1.prismaClient.pot.update({
        where: {
            userId,
            id,
        },
        data: Object.assign({}, req.body),
    });
    res.status(200).json(pot);
});
exports.updatePot = updatePot;
const deletePot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (userId === 1) {
        return res.status(200).json({ message: "Skipping demo account" });
    }
    const id = +req.params.id;
    const pot = yield __1.prismaClient.pot.delete({
        where: {
            userId,
            id,
        },
    });
    res.status(200).json(pot);
});
exports.deletePot = deletePot;
const addFunds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    pots_1.addFundsSchema.parse(req.body);
    const { saved } = req.body;
    const id = +req.params.id;
    const userId = req.user.id;
    if (userId === 1) {
        return res.status(200).json({ message: "Skipping demo account" });
    }
    let pot = yield __1.prismaClient.pot.findFirst({ where: { id, userId } });
    if (!pot)
        throw new bad_request_1.BadRequestException("Pot does not exist", root_1.ErrorCodes.POT_DOES_NOT_EXIST);
    if (saved > pot.target)
        throw new bad_request_1.BadRequestException("Pot saved cannot exceed target", root_1.ErrorCodes.POT_SAVED_EXCEEDS_TARGET);
    pot = yield __1.prismaClient.pot.update({
        where: { id, userId },
        data: { saved },
    });
    res.status(200).json(pot);
});
exports.addFunds = addFunds;
const withdrawFunds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    pots_1.withdrawFundsSchema.parse(req.body);
    const { saved } = req.body;
    const id = +req.params.id;
    const userId = req.user.id;
    if (userId === 1) {
        return res.status(200).json({ message: "Skipping demo account" });
    }
    let pot = yield __1.prismaClient.pot.findFirst({ where: { id, userId } });
    if (!pot)
        throw new bad_request_1.BadRequestException("Pot does not exist", root_1.ErrorCodes.POT_DOES_NOT_EXIST);
    if (saved < 0)
        throw new bad_request_1.BadRequestException("Pot saved cannot exceed target", root_1.ErrorCodes.POT_SAVED_CANNOT_BE_NEGATIVE);
    pot = yield __1.prismaClient.pot.update({
        where: { id, userId },
        data: { saved },
    });
    res.status(200).json(pot);
});
exports.withdrawFunds = withdrawFunds;
