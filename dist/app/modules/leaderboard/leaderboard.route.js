"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderBoardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const leaderboard_controller_1 = require("./leaderboard.controller");
const router = express_1.default.Router();
router.post('/', 
//   validateRequest(CategoryValidation.createCategoryZodSchema),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.PERFORMER), leaderboard_controller_1.LeaderBoardController.insertIntoDB);
router.get('/', leaderboard_controller_1.LeaderBoardController.getAllFromDB);
exports.LeaderBoardRoutes = router;
