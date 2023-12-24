import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { QuizController } from './quiz.controller';

const router = express.Router();

router.get(
    '/category',
    auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.PERFORMER),
    QuizController.getAllFromDBByCategory
  );
  
router.patch(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.PERFORMER),
    QuizController.updateQuizInDB
  );

router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.PERFORMER),
  QuizController.insertIntoDB
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.PERFORMER),
  QuizController.getAllFromDB
);

router.get(
    '/:id',
    auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.PERFORMER),
    QuizController.getByIdFromDB
  );



router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.PERFORMER),
  QuizController.deleteQuizFromDB
);

export const QuizRoutes = router;
