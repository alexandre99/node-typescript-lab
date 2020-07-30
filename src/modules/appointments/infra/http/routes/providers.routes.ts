import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ProviderController from '@modules/appointments/infra/http/controllers/ProviderController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providerRouter = Router();
const providerController = new ProviderController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providerController.index);

providerRouter.get(
  '/:providerId/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      providerId: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index,
);
providerRouter.get(
  '/:providerId/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      providerId: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);

export default providerRouter;
