import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validate';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.PERFORMER), UserController.getByIdFromDB);
router.patch(
  '/:id',
  validateRequest(UserValidation.userUpdateZodSchema),
  auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.PERFORMER),
  UserController.updateOneInDB
);
// router.delete(
//   '/:id',
//   auth(ENUM_USER_ROLE.ADMIN),
//   UserController.deleteByIdFromDB
// );

export const UserRoutes = router;
