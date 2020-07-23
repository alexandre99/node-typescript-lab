import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const providerId = '121313';

    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe(providerId);
  });

  it('should be able to create two appointments on the same time', async () => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const date = new Date();
    const providerId = '121313';

    await createAppointment.execute({
      date,
      providerId,
    });

    await expect(
      createAppointment.execute({
        date,
        providerId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
