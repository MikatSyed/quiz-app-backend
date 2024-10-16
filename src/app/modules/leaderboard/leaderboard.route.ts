import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { LeaderBoardController } from './leaderboard.controller';


const router = express.Router();
router.post(
  '/',
//   validateRequest(CategoryValidation.createCategoryZodSchema),
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.PERFORMER),
  LeaderBoardController.insertIntoDB
);

router.get('/', LeaderBoardController.getAllFromDB);



export const LeaderBoardRoutes = router;
