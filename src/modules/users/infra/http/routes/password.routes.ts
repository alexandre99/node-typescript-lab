import { Router } from 'express';

import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
