import { test } from 'tests/fixtures/base.fixture';
import { Data } from 'tests/core/Data';
import { SELECTION_DATA_FILE } from '../../../data/paths.js';

test.describe('Selección y carrito', () => {
  test('CP08 - Límites de cantidad en el detalle del evento (1 a 4)', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
    eventDetailTask,
  }) => {
    // falla porque el + deja pasar de 4 entradas (ver casos de prueba)
    const { input, expected } = await Data.getCase(SELECTION_DATA_FILE, 'CP08');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToEvents();
    await eventsListTask.selectCategory(input.category);
    await eventsListTask.openDetail(input.event);

    await eventDetailTask.expectQuantity(expected.min);
    await eventDetailTask.expectHelpText(expected.helpText);

    await eventDetailTask.decrease();
    await eventDetailTask.expectQuantity(expected.min);

    await eventDetailTask.increase(6);
    await eventDetailTask.expectQuantity(expected.max);

    await eventDetailTask.increase();
    await eventDetailTask.expectQuantity(expected.max);
  });
});
