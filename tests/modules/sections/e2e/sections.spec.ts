import { test } from 'tests/fixtures/base.fixture';
import { Data } from 'tests/core/Data';
import { USERS } from '../../../data/users.js';
import { EXISTING_COURSE, SECTION_MESSAGES } from '../../../data/sections.js';
import { SECTIONS_DATA_FILE } from '../../../data/paths.js';
import { SectionType } from '../poms/sections.form';

function sectionType(type: string): SectionType {
  return type as SectionType;
}

test.describe('Secciones - UI (writer)', () => {
  test.beforeEach(async ({ loginFormTask, dashboardTask, coursesListTask }) => {
    await loginFormTask.login(USERS.WRITER.user, USERS.WRITER.pass);
    await dashboardTask.expectLoggedInAs(USERS.WRITER.user, 'writer');
    await coursesListTask.selectCourse(EXISTING_COURSE);
  });

  test('SECTION-01 - Alta de sección con nombre, tipo y contenido válidos', async ({
    sectionsList,
    sectionsListTask,
    sectionsFormTask,
    spinnerTask,
  }) => {
    const { input, expected } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-01');
    const name = Data.unique(input.name);

    await sectionsFormTask.addSection(
      sectionsList.addSectionButton,
      name,
      sectionType(input.type),
      input.content,
    );
    await spinnerTask.waitUntilHidden();

    await sectionsFormTask.expectSuccessMessage(expected.uiSuccessMessage);
    await sectionsListTask.expectSectionVisible(name);
    await sectionsListTask.expectSectionContent(name, input.content);
  });

  test('SECTION-02 - No permite crear una sección sin nombre (con tipo y contenido)', async ({
    sectionsList,
    sectionsFormTask,
  }) => {
    const { input, expected } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-02');

    await sectionsFormTask.open(sectionsList.addSectionButton);
    await sectionsFormTask.selectType(sectionType(input.type));
    await sectionsFormTask.fillContent(input.content);
    await sectionsFormTask.submit();

    await sectionsFormTask.expectErrorMessage(expected.ui.uiErrorMessage);
    await sectionsFormTask.expectOpen();
  });

  test('SECTION-03 - No permite crear una sección sin tipo (con nombre y contenido)', async ({
    sectionsList,
    sectionsFormTask,
  }) => {
    const { input, expected } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-03');

    await sectionsFormTask.open(sectionsList.addSectionButton);
    await sectionsFormTask.fillName(Data.unique(input.name));
    await sectionsFormTask.fillContent(input.content);
    await sectionsFormTask.submit();

    await sectionsFormTask.expectErrorMessage(expected.ui.uiErrorMessage);
    await sectionsFormTask.expectOpen();
  });

  test('SECTION-04 - Sección con nombre y tipo válidos, pero sin contenido', async ({
    sectionsList,
    sectionsFormTask,
  }) => {
    const { input, expected } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-04');

    await sectionsFormTask.open(sectionsList.addSectionButton);
    await sectionsFormTask.fillName(Data.unique(input.name));
    await sectionsFormTask.selectType(sectionType(input.type));
    await sectionsFormTask.submit();

    await sectionsFormTask.expectErrorMessage(expected.ui.uiErrorMessage);
    await sectionsFormTask.expectOpen();
  });

  test('SECTION-05 - No permite un nombre de sección que supere el máximo permitido (50 caracteres)', async ({
    sectionsList,
    sectionsListTask,
    sectionsFormTask,
    spinnerTask,
  }) => {
    const { input } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-05');
    await sectionsFormTask.addSection(
      sectionsList.addSectionButton,
      input.name,
      sectionType(input.type),
      input.content,
    );
    await spinnerTask.waitUntilHidden();
    await sectionsFormTask.expectErrorMessage('No se pudo guardar la sección');
    await sectionsListTask.expectSectionNotVisible(input.name);
  });

  test('SECTION-06 - No permite crear una sección con nombre correcto pero contenido que supera el máximo permitido (500 caracteres)', async ({
    sectionsList,
    sectionsListTask,
    sectionsFormTask,
    spinnerTask,
  }) => {
    const { input } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-06');
    const name = Data.unique(input.name);
    await sectionsFormTask.addSection(
      sectionsList.addSectionButton,
      name,
      sectionType(input.type),
      input.content,
    );
    await spinnerTask.waitUntilHidden();
    await sectionsFormTask.expectErrorMessage('No se pudo guardar la sección');
    await sectionsListTask.expectSectionNotVisible(name);
  });

  test('Editar y eliminar una sección existente', async ({
    sectionsList,
    sectionsListTask,
    sectionsFormTask,
    spinnerTask,
  }) => {
    const { input } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-01');
    const name = Data.unique(input.name);
    await sectionsFormTask.addSection(
      sectionsList.addSectionButton,
      name,
      sectionType(input.type),
      input.content,
    );
    await spinnerTask.waitUntilHidden();

    const editedName = `${name} editada`;
    await sectionsListTask.editSection(name);
    await sectionsFormTask.fillName(editedName);
    await sectionsFormTask.submit();
    await spinnerTask.waitUntilHidden();
    await sectionsFormTask.expectSuccessMessage(SECTION_MESSAGES.updated);
    await sectionsListTask.expectSectionVisible(editedName);

    await sectionsListTask.deleteSection(editedName);
    await sectionsListTask.expectSuccessMessage(SECTION_MESSAGES.deleted);
    await sectionsListTask.expectSectionNotVisible(editedName);
  });
});
