import { test } from 'tests/fixtures/base.fixture';
import { Data } from 'tests/core/Data';
import { EVENTS_DATA_FILE } from '../../../data/paths.js';

test.describe('Catálogo', () => {
  test('CP04 - Filtrar eventos por categoría Gaming', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
  }) => {
    // falla por el bug del filtro Gaming (ver casos de prueba)
    const { input, expected } = await Data.getCase(EVENTS_DATA_FILE, 'CP04');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToEvents();

    await eventsListTask.selectCategory(input.category);
    await eventsListTask.expectCategorySelected(input.category);

    await eventsListTask.expectAllCardsHaveCategory(input.category);
    await eventsListTask.expectEventVisible(expected.mustInclude);
    await eventsListTask.expectCountMatchesVisibleCards();
  });

  test('CP05 - Buscar un evento por nombre', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
  }) => {
    const { input, expected } = await Data.getCase(EVENTS_DATA_FILE, 'CP05');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToEvents();

    await eventsListTask.search(input.search);

    await eventsListTask.expectEventVisible(expected.mustAppear);
    await eventsListTask.expectAllTitlesContain(input.search);
    await eventsListTask.expectCountMatchesVisibleCards();
  });

  test('CP06 - Navegar la paginación del listado', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
  }) => {
    const { input, expected } = await Data.getCase(EVENTS_DATA_FILE, 'CP06');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToEvents();
    await eventsListTask.expectCategorySelected(input.category);

    await eventsListTask.expectPageActive('1');
    await eventsListTask.expectPageButtonDisabled('Anterior');
    const firstTitle = await eventsListTask.firstEventTitle();

    await eventsListTask.goToPage('2');
    await eventsListTask.expectPageActive('2');
    await eventsListTask.expectFirstEventNot(firstTitle);

    await eventsListTask.goToPage('Siguiente');
    await eventsListTask.expectPageActive('3');

    await eventsListTask.goToPage('Anterior');
    await eventsListTask.expectPageActive('2');

    await eventsListTask.goToPage(expected.lastPage);
    await eventsListTask.expectPageActive(expected.lastPage);
    await eventsListTask.expectPageButtonDisabled('Siguiente');
  });
});
