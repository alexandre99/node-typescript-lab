import { Router } from 'express';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.get('/', ensureAuthenticated, profileController.show);
profileRouter.put('/', ensureAuthenticated, profileController.update);

export default profileRouter;
