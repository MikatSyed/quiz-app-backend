/* eslint-disable no-undef */
/* @typescript-eslint/no-unused-vars */

import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IResponseUser } from './user.interface';

const getAllFromDB = async (): Promise<Partial<IResponseUser[]>> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  });
  return result;
};

const getByIdFromDB = async (id: string): Promise<IResponseUser | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
     
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Not Found!');
  }
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<User>
): Promise<IResponseUser> => {
  const isUserExist = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const { password, role, ...userData } = payload;
  const updatedUserData: Partial<User> = { ...userData };

  if (password) {
    const salt = await bcrypt.genSalt(Number(config.bycrypt_salt_rounds));
    const hashedPassword = await bcrypt.hash(password, salt);
    updatedUserData.password = hashedPassword;
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: updatedUserData,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    
    },
  });
  return result;
};

// const deleteByIdFromDB = async (id: string): Promise<IResponseUser> => {
//   const isUserExist = await prisma.user.findFirst({
//     where: {
//       id,
//     },
//   });

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   const result = await prisma.$transaction(async transactionClient => {
//     await transactionClient.order.deleteMany({
//       where: {
//         userId: isUserExist?.id,
//       },
//     });

//     const data = await transactionClient.user.delete({
//       where: {
//         id,
//       },
//     });
//     return data;
//   });
//   return result;
// };

export const UserService = {
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  // deleteByIdFromDB,
};
