import { test, expect } from 'tests/fixtures/base.fixture';
import { Data } from 'tests/core/Data';
import { ACCESS_DATA_FILE } from '../../../data/paths.js';

test.describe('Acceso', () => {
  test('CP01 - Login exitoso con usuario válido', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
  }) => {
    const { input } = await Data.getCase(ACCESS_DATA_FILE, 'CP01');

    await loginFormTask.expectStillOnLoginScreen();
    await loginFormTask.fillUser(input.user);
    await loginFormTask.fillPass(input.pass);
    await loginFormTask.expectUserValue(input.user);
    await loginFormTask.expectPassValue(input.pass);

    await loginFormTask.submit();

    await loginFormTask.expectLoggedIn();
    await eventsListTask.expectListVisible();
    await menuTask.expectVisible();
  });

  test('CP02 - Login con contraseña incorrecta', async ({ loginFormTask, menuTask }) => {
    const { input, expected } = await Data.getCase(ACCESS_DATA_FILE, 'CP02');

    await loginFormTask.expectStillOnLoginScreen();
    await loginFormTask.fillUser(input.user);
    await loginFormTask.fillPass(input.pass);
    await loginFormTask.expectUserValue(input.user);
    await loginFormTask.expectPassValue(input.pass);

    const alertMessage = await loginFormTask.submitExpectingAlert();

    expect(alertMessage).toBe(expected.alertMessage);
    await loginFormTask.expectStillOnLoginScreen();
    await menuTask.expectHidden();
  });

  test('CP03 - Cerrar sesión y no acceder a una página protegida', async ({
    loginFormTask,
    menuTask,
    ticketsListTask,
    app,
  }) => {
    const { input } = await Data.getCase(ACCESS_DATA_FILE, 'CP03');

    await loginFormTask.login(input.user, input.pass);
    await loginFormTask.expectLoggedIn();

    await menuTask.goToTickets();
    await ticketsListTask.expectVisible();

    await menuTask.logout();
    await loginFormTask.expectStillOnLoginScreen();

    await app.goto('#/tickets');
    await loginFormTask.expectStillOnLoginScreen();
    await ticketsListTask.expectNoTicketsVisible();
  });
});
