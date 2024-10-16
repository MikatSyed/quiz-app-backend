import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { LeaderBoardService } from './leaderboard.service';

const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await LeaderBoardService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Leader Board posted successfully',
    data: result,
  });
});

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await LeaderBoardService.getAllFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Leader Board fetched successfully',
    data: result,
  });
});


export const LeaderBoardController = {
  insertIntoDB,
  getAllFromDB
};
