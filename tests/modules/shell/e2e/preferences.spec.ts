import { test } from 'tests/fixtures/base.fixture';
import { USERS } from '../../../data/users.js';

test.describe('Widget de preferencias (iframe anidado en la ventana principal)', () => {
  test.beforeEach(async ({ loginFormTask }) => {
    await loginFormTask.login(USERS.ADMIN.user, USERS.ADMIN.pass);
  });

  test('PREFERENCES-01 - Activa y desactiva el modo compacto', async ({ preferencesTask }) => {
    await preferencesTask.expectCompactModeDisabled();

    await preferencesTask.toggleCompactMode();
    await preferencesTask.expectCompactModeEnabled();

    await preferencesTask.toggleCompactMode();
    await preferencesTask.expectCompactModeDisabled();
  });
});
