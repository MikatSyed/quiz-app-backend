import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({ data });
  return result;
};

const getAllFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({});
  return result;
};


const getByIdFromDB = async (id: string): Promise<Category | null> => {
  const isCategoryExist = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }

  const result = await prisma.category.findUnique({
    where: {
      id,
    },
   
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const isCategoryExist = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
   
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Category> => {
  const isCategoryExist = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    // Delete Option records first
    await transactionClient.option.deleteMany({
      where: {
        question: {
          CategoryId: isCategoryExist?.id,
        },
      },
    });

    // Delete Question records
    await transactionClient.question.deleteMany({
      where: {
        CategoryId: isCategoryExist?.id,
      },
    });

    // Delete Category record
    const data = await transactionClient.category.delete({
      where: {
        id,
      },
    });

    return data;
  });

  return result;
};


export const CategoryService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
