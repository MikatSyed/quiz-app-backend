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
exports.QuizService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, CategoryId, options, correctOptionId } = data;
    const question = yield prisma_1.default.question.create({
        data: {
            content,
            correctOptionId,
            CategoryId,
            options: {
                create: options.map((option) => ({
                    content: option.content,
                    type: option.type,
                })),
            },
        },
        include: {
            options: true,
        },
    });
    return question;
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.question.findMany({
        include: {
            options: true,
        },
    });
    return result;
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExist = yield prisma_1.default.question.findFirst({
        where: {
            id,
        },
    });
    if (!isCategoryExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Quiz does not exist');
    }
    const result = yield prisma_1.default.question.findUnique({
        where: {
            id,
        },
        include: {
            options: true,
        }
    });
    return result;
});
const getAllFromDBByCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(categoryId, 'bbbbbbbb');
    const result = yield prisma_1.default.question.findMany({
        where: {
            CategoryId: categoryId,
        },
        include: {
            options: true,
        },
    });
    return result;
});
const updateQuizInDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, CategoryId, options, correctOptionId } = data;
    // Update the question
    const updatedQuestion = yield prisma_1.default.question.update({
        where: {
            id,
        },
        data: {
            content,
            correctOptionId,
            CategoryId,
            options: {
                updateMany: options.map((option) => ({
                    where: {
                        id: option.id, // Assuming each option has an id field
                    },
                    data: {
                        content: option.content,
                        type: option.type,
                    },
                })),
            },
        },
        include: {
            options: true,
        },
    });
    return updatedQuestion;
});
const deleteQuizFromDB = (questionId) => __awaiter(void 0, void 0, void 0, function* () {
    const question = yield prisma_1.default.question.findUnique({
        where: { id: questionId },
        include: {
            options: true,
        },
    });
    if (!question) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Question does not exist');
    }
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // Delete options associated with the question
        yield transactionClient.option.deleteMany({
            where: {
                questionId,
            },
        });
        // Delete the question
        const data = yield transactionClient.question.delete({
            where: {
                id: questionId,
            },
        });
        return data;
    }));
    return result;
});
exports.QuizService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    getAllFromDBByCategory,
    updateQuizInDB,
    deleteQuizFromDB
};
