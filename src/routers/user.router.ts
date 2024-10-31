import { Router } from 'express';
import { userController } from '#controllers/user.controller.js';

const userRouter: Router = Router();

userRouter.put('/users/:id', userController.updateUser);

userRouter.delete('/users/:id', userController.deleteUser);

export { userRouter };
