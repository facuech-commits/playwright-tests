import { test } from 'tests/fixtures/base.fixture';
import { USERS } from '../../../data/users.js';

test.describe('Perfil de usuario', () => {
  test('PROFILE-01 - Perfil del usuario administrador', async ({
    loginFormTask,
    profileTask,
    dashboardTask,
  }) => {
    await loginFormTask.login(USERS.ADMIN.user, USERS.ADMIN.pass);
    await profileTask.expectProfile(USERS.ADMIN.user, 'admin');
    await profileTask.close();
    await profileTask.expectClosed();
    await dashboardTask.expectLoggedInAs(USERS.ADMIN.user, 'admin');
  });

  test('PROFILE-02 - Perfil del usuario escritor', async ({
    loginFormTask,
    profileTask,
    dashboardTask,
  }) => {
    await loginFormTask.login(USERS.WRITER.user, USERS.WRITER.pass);
    await profileTask.expectProfile(USERS.WRITER.user, 'writer');
    await profileTask.close();
    await profileTask.expectClosed();
    await dashboardTask.expectLoggedInAs(USERS.WRITER.user, 'writer');
  });
});
