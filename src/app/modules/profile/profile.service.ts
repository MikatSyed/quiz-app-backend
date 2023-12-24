import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IResponseUser } from '../user/user.interface';
import ApiError from '../../../errors/ApiError';

const getUserProfile = async (id: string):Promise<Partial<IResponseUser | null>> => {
  const result = await prisma.user.findFirst({
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
  return result;
};



export const ProfileService = {
  getUserProfile,
};
