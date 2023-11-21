import { Router } from "express";
import UserController from "../controllers/userControllers";

const UserRouter = Router();

UserRouter.get('/', UserController.list);

export default UserRouter
