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
exports.LeaderBoardService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.leaderboard.create({ data });
    return result;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.leaderboard.findMany({
        select: {
            id: true,
            score: true,
            createdAt: true,
            user: {
                select: {
                    username: true,
                },
            },
            Categories: {
                select: {
                    title: true,
                },
            },
        },
        orderBy: {
            score: 'desc',
        },
    });
    return result.map(item => ({
        id: item.id,
        username: item.user.username,
        score: item.score,
        categoryName: item.Categories.title,
        createdAt: item.createdAt,
    }));
});
exports.LeaderBoardService = {
    insertIntoDB,
    getAllFromDB,
};
