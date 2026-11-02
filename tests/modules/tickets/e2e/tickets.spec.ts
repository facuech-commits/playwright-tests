import { test } from 'tests/fixtures/base.fixture';
import { Data } from 'tests/core/Data';
import { TICKETS_DATA_FILE } from '../../../data/paths.js';

test.describe('Entradas', () => {
  test('CP15 - La entrada no muestra datos sensibles de la tarjeta', async ({
    loginFormTask,
    menuTask,
    ticketsListTask,
  }) => {
    // falla porque la entrada muestra otro titular y los datos de la tarjeta (ver casos de prueba)
    const { input, expected } = await Data.getCase(TICKETS_DATA_FILE, 'CP15');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToTickets();
    await ticketsListTask.expectTicketsVisible();

    await ticketsListTask.openFirstTicket();
    await ticketsListTask.expectTicket(expected.event, expected.date, expected.owner);
    await ticketsListTask.expectCodeAndQr(expected.code);

    await ticketsListTask.expectNoPaymentData(
      expected.cardNumber,
      expected.validationCode,
      expected.balance,
    );
  });
});
