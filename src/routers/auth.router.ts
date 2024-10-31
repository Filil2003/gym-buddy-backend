import { Router } from 'express';
import { authController } from '#controllers/auth.controller.js';

const authRouter: Router = Router();

authRouter.post('/register', authController.register);

authRouter.post('/sign-in', authController.signIn);

export { authRouter };
