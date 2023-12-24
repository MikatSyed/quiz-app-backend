import { Question } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (data: any): Promise<Question> => {
  const { content, CategoryId, options, correctOptionId } = data;
  const question = await prisma.question.create({
    data: {
      content,
      correctOptionId,
      CategoryId,
      options: {
        create: options.map((option:any) => ({
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
};
const getAllFromDB = async (): Promise<Question[]> => {
    const result = await prisma.question.findMany({  
        include: {
        options: true,
      },});
    return result;
  };

const getByIdFromDB = async (id: string): Promise<Question | null> => {
    const isCategoryExist = await prisma.question.findFirst({
      where: {
        id,
      },
     
    });
  
    if (!isCategoryExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Quiz does not exist');
    }
  
    const result = await prisma.question.findUnique({
      where: {
        id,
      },
      include: {
        options: true,
      }
    });
    return result;
  };
  

const getAllFromDBByCategory = async (categoryId: any): Promise<Question[]> => {
    console.log(categoryId,'bbbbbbbb');
    const result = await prisma.question.findMany({
        where: {
            CategoryId: categoryId,
        },
        include: {
            options: true,
        },
    });
    return result;
};

const updateQuizInDB = async (id: string, data: any): Promise<Question> => {
    const { content, CategoryId, options, correctOptionId } = data;
  
    // Update the question
    const updatedQuestion = await prisma.question.update({
      where: {
        id,
      },
      data: {
        content,
        correctOptionId,
        CategoryId,
        options: {
          updateMany: options.map((option: any) => ({
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
  };

const deleteQuizFromDB = async (questionId: string): Promise<Question> => {
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        options: true,
      },
    });
  
    if (!question) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Question does not exist');
    }
  
   const result =  await prisma.$transaction(async (transactionClient) => {
      // Delete options associated with the question
      await transactionClient.option.deleteMany({
        where: {
          questionId,
        },
      });
  
      // Delete the question
     const data =  await transactionClient.question.delete({
        where: {
          id: questionId,
        },
      });
      return data;
    });
    return result;
  };
  
  
  
export const QuizService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  getAllFromDBByCategory,
  updateQuizInDB,
  deleteQuizFromDB
};
