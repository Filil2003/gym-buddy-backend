import { userController } from '@controllers/user.controller.js';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/users', userController.getAllUsers);

userRouter.get('/users/:id', userController.getUserById);

userRouter.post('/users', userController.createUser);

userRouter.put('/users/:id', userController.updateUser);

userRouter.delete('/users/:id', userController.deleteUser);

export { userRouter };
