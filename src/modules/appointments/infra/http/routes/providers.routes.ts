import { Router } from 'express';

import ProviderController from '@modules/appointments/infra/http/controllers/ProviderController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providerRouter = Router();
const providerController = new ProviderController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providerController.index);

export default providerRouter;
