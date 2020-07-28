import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params;
    const { day, month, year } = request.body;

    const ListProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const providers = await ListProviderDayAvailability.execute({
      providerId,
      day,
      month,
      year,
    });

    const statusCode = providers && providers.length ? 200 : 204;

    return response.status(statusCode).json(providers);
  }
}
