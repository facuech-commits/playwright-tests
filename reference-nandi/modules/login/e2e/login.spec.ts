import { test } from 'tests/fixtures/base.fixture';
import { Data } from 'tests/core/Data';
import { LOGIN_DATA_FILE } from '../../../data/paths.js';

test.describe('Login', () => {
  test('LOGIN-01 - Login vacío: no se completa usuario ni contraseña', async ({
    loginFormTask,
  }) => {
    const { input } = await Data.getCase(LOGIN_DATA_FILE, 'LOGIN-01');
    await loginFormTask.login(input.user, input.pass);
    await loginFormTask.expectFormNotSubmitted();
    await loginFormTask.expectNoError();
  });

  test('LOGIN-02 - Login solo con usuario (valor válido), sin contraseña', async ({
    loginFormTask,
  }) => {
    const { input } = await Data.getCase(LOGIN_DATA_FILE, 'LOGIN-02');
    await loginFormTask.login(input.user, input.pass);
    await loginFormTask.expectFormNotSubmitted();
    await loginFormTask.expectNoError();
  });

  test('LOGIN-03 - Login solo con contraseña (valor válido), sin usuario', async ({
    loginFormTask,
  }) => {
    const { input } = await Data.getCase(LOGIN_DATA_FILE, 'LOGIN-03');
    await loginFormTask.login(input.user, input.pass);
    await loginFormTask.expectFormNotSubmitted();
    await loginFormTask.expectNoError();
  });

  test('LOGIN-04 - Usuario y contraseña no coinciden con ningún usuario existente', async ({
    loginFormTask,
  }) => {
    const { input, expected } = await Data.getCase(LOGIN_DATA_FILE, 'LOGIN-04');
    await loginFormTask.login(input.user, input.pass);
    await loginFormTask.expectError(expected.uiErrorMessage);
  });

  test('LOGIN-05 - Login exitoso como administrador', async ({ loginFormTask, dashboardTask }) => {
    const { input, expected } = await Data.getCase(LOGIN_DATA_FILE, 'LOGIN-05');
    await loginFormTask.login(input.user, input.pass);
    await dashboardTask.expectLoggedInAs(input.user, expected.role as 'admin' | 'writer');
  });

  test('LOGIN-06 - Login exitoso como escritor (writer)', async ({
    loginFormTask,
    dashboardTask,
  }) => {
    const { input, expected } = await Data.getCase(LOGIN_DATA_FILE, 'LOGIN-06');
    await loginFormTask.login(input.user, input.pass);
    await dashboardTask.expectLoggedInAs(input.user, expected.role as 'admin' | 'writer');
  });

  test('Logout returns to the login screen', async ({ loginFormTask, dashboardTask }) => {
    const { input } = await Data.getCase(LOGIN_DATA_FILE, 'LOGIN-05');
    await loginFormTask.login(input.user, input.pass);
    await dashboardTask.logout();
    await dashboardTask.expectLoggedOut();
  });
});
