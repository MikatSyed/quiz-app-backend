import { Leaderboard } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Leaderboard): Promise<Leaderboard> => {
  const result = await prisma.leaderboard.create({ data });
  return result;
};

const getAllFromDB = async (): Promise<any[]> => {
  const result = await prisma.leaderboard.findMany({
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
};



export const LeaderBoardService = {
  insertIntoDB,
  getAllFromDB,

};
