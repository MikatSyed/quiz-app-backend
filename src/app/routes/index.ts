import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { LeaderBoardRoutes } from '../modules/leaderboard/leaderboard.route';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { QuizRoutes } from '../modules/quiz/quiz.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/quiz',
    route: QuizRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/leader-board',
    route: LeaderBoardRoutes,
  },
  

];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
