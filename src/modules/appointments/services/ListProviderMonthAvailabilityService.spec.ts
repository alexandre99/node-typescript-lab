import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    const promiseCreateAppointments = [];
    const maxNumberOfAppointments = 10;
    let initialHour = 8;
    for (let i = 0; i < maxNumberOfAppointments; i += 1) {
      promiseCreateAppointments.push(
        fakeAppointmentsRepository.create({
          providerId: 'user',
          date: new Date(2020, 4, 20, initialHour, 0, 0),
        }),
      );
      initialHour += 1;
    }

    await Promise.all(promiseCreateAppointments);

    await fakeAppointmentsRepository.create({
      providerId: 'user',
      date: new Date(2020, 4, 21, 10, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      providerId: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
