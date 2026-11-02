import { test } from 'tests/fixtures/base.fixture';
import { Data } from 'tests/core/Data';
import { USERS } from '../../../data/users.js';
import { COURSES_DATA_FILE } from '../../../data/paths.js';

test.describe('Cursos - UI (admin)', () => {
  test.beforeEach(async ({ loginFormTask }) => {
    await loginFormTask.login(USERS.ADMIN.user, USERS.ADMIN.pass);
  });

  test('COURSE-01 - Alta de curso con nombre y descripción válidos', async ({
    coursesList,
    coursesListTask,
    coursesFormTask,
    spinnerTask,
  }) => {
    const { input, expected } = await Data.getCase(COURSES_DATA_FILE, 'COURSE-01');
    const name = Data.unique(input.name);

    await coursesFormTask.addCourse(coursesList.addCourseButton, name, input.description);
    await spinnerTask.waitUntilHidden();

    await coursesFormTask.expectSuccessMessage(expected.uiSuccessMessage);
    await coursesListTask.expectCourseVisible(name);

    await coursesListTask.selectCourse(name);
    await coursesListTask.expectDescription(input.description);
  });

  test('COURSE-02 - No permite crear un curso sin nombre (con descripción)', async ({
    coursesList,
    coursesFormTask,
  }) => {
    const { input, expected } = await Data.getCase(COURSES_DATA_FILE, 'COURSE-02');

    await coursesFormTask.open(coursesList.addCourseButton);
    await coursesFormTask.fillDescription(input.description);
    await coursesFormTask.submit();

    await coursesFormTask.expectErrorMessage(expected.ui.uiErrorMessage);
    await coursesFormTask.expectOpen();
  });

  test('COURSE-03 - No permite crear un curso con nombre pero sin descripción', async ({
    coursesList,
    coursesFormTask,
  }) => {
    const { input, expected } = await Data.getCase(COURSES_DATA_FILE, 'COURSE-03');

    await coursesFormTask.open(coursesList.addCourseButton);
    await coursesFormTask.fillName(Data.unique(input.name));
    await coursesFormTask.submit();

    await coursesFormTask.expectErrorMessage(expected.ui.uiErrorMessage);
    await coursesFormTask.expectOpen();
  });

  test('COURSE-04 - No permite un nombre de curso que supere el máximo permitido (50 caracteres)', async ({
    coursesList,
    coursesListTask,
    coursesFormTask,
    spinnerTask,
  }) => {
    const { input } = await Data.getCase(COURSES_DATA_FILE, 'COURSE-04');
    await coursesFormTask.addCourse(coursesList.addCourseButton, input.name, input.description);
    await spinnerTask.waitUntilHidden();
    await coursesFormTask.expectErrorMessage('No se pudo guardar el curso');
    await coursesListTask.expectCourseNotVisible(input.name);
  });

  test('COURSE-05 - No permite crear un curso con nombre correcto pero descripción que supera el máximo permitido (500 caracteres)', async ({
    coursesList,
    coursesListTask,
    coursesFormTask,
    spinnerTask,
  }) => {
    const { input } = await Data.getCase(COURSES_DATA_FILE, 'COURSE-05');
    const name = Data.unique(input.name);
    await coursesFormTask.addCourse(coursesList.addCourseButton, name, input.description);
    await spinnerTask.waitUntilHidden();
    await coursesFormTask.expectErrorMessage('No se pudo guardar el curso');
    await coursesListTask.expectCourseNotVisible(name);
  });
});
