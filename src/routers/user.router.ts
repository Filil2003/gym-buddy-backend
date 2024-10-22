import { userController } from '@controllers/user.controller.js';
import { Router } from 'express';

const userRouter = Router();

// GET /users
userRouter.get('/users', userController.getAllUsers);

// GET /users/:id
userRouter.get('/users/:id', userController.getUserById);

// POST /users
userRouter.post('/users', userController.createUser);

// PUT /users/:id
userRouter.put('/users/:id', userController.updateUser);

// DELETE /users/:id
userRouter.delete('/users/:id', userController.deleteUser);

export { userRouter };
