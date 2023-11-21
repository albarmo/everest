import { Router } from 'express';
import UserRouter from './user.router';

const routes = Router();
routes.use('/user', UserRouter);

export default routes