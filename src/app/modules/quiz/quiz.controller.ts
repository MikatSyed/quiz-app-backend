import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { QuizService } from './quiz.service';


const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await QuizService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quiz created successfully',
    data: result,
  });
});
const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await QuizService.getAllFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quiz fetched successfully',
    data: result,
  });
});
const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
    const {id} = req.params;
  const result = await QuizService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quiz fetched successfully',
    data: result,
  });
});

const getAllFromDBByCategory: RequestHandler = catchAsync(async (req, res) => {
    const { categoryId } = req.query;
  const result = await QuizService.getAllFromDBByCategory(categoryId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quiz fetched successfully',
    data: result,
  });
});

const updateQuizInDB: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuizService.updateQuizInDB(id,req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Quiz updated successfully',
      data: result,
    });
  });
const deleteQuizFromDB: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await QuizService.deleteQuizFromDB(id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Quiz deleted successfully',
      data: result,
    });
  });

export const QuizController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  getAllFromDBByCategory,
  updateQuizInDB,
  deleteQuizFromDB
};
