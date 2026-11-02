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
    await loginFormTask.expectLoggedIn();
    await menuTask.goToEvents();
    await eventsListTask.expectListVisible();
    await eventsListTask.expectCategorySelected('Todas');

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
    await loginFormTask.expectLoggedIn();
    await menuTask.goToEvents();
    await eventsListTask.expectListVisible();

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

  test('CP07 - El detalle de un evento coincide con su tarjeta', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
    eventDetailTask,
  }) => {
    // falla porque al volver del detalle se pierde la busqueda (ver casos de prueba)
    const { input } = await Data.getCase(EVENTS_DATA_FILE, 'CP07');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToEvents();
    await eventsListTask.expectListVisible();

    await eventsListTask.search(input.search);
    await eventsListTask.expectEventVisible(input.search);
    const card = await eventsListTask.getFirstCardData();

    await eventsListTask.openFirstDetail();
    await eventDetailTask.expectVisible();
    await eventDetailTask.expectSameDataAsCard(card);

    await eventDetailTask.goBack();
    await eventsListTask.expectListVisible();
    await eventsListTask.expectSearchValue(input.search);
  });
});
