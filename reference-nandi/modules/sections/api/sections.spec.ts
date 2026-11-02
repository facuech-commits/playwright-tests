import { test, expect } from 'tests/fixtures/base.fixture';
import { APIRequestContext } from '@playwright/test';
import { Data } from 'tests/core/Data';
import { SECTIONS_DATA_FILE } from '../../../data/paths.js';

test.describe('Secciones - API directa (casos no alcanzables desde la UI)', () => {
  async function firstCourseId(request: APIRequestContext): Promise<string> {
    const existingCourse = await Data.getValue<string>(SECTIONS_DATA_FILE, 'EXISTING_COURSE');

    const res = await request.get('/api/courses');
    const courses = await res.json();
    const course = courses.find((c: { name: string }) => c.name === existingCourse);
    if (!course)
      throw new Error(`Seed course "${existingCourse}" not found — run node reset-data.js`);
    return course.id;
  }

  test('SECTION-02 (API) - rechaza una sección sin nombre', async ({ request }) => {
    const { input, expected } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-02');
    const courseId = await firstCourseId(request);

    const res = await request.post(`/api/courses/${courseId}/sections`, {
      data: { name: '', type: input.type, content: input.content },
    });

    expect(res.status()).toBe(expected.api.httpStatus);
    const body = await res.json();
    expect(body.error).toBe(expected.api.apiErrorMessage);
  });

  test('SECTION-03 (API) - rechaza una sección sin tipo', async ({ request }) => {
    const { input, expected } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-03');
    const courseId = await firstCourseId(request);

    const res = await request.post(`/api/courses/${courseId}/sections`, {
      data: { name: Data.unique(input.name), type: '', content: input.content },
    });

    expect(res.status()).toBe(expected.api.httpStatus);
    const body = await res.json();
    expect(body.error).toBe(expected.api.apiErrorMessage);
  });

  test('SECTION-04 (API) - acepta una sección sin contenido', async ({ request }) => {
    const { input, expected } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-04');
    const courseId = await firstCourseId(request);

    const res = await request.post(`/api/courses/${courseId}/sections`, {
      data: { name: Data.unique(input.name), type: input.type, content: '' },
    });

    expect(res.status()).toBe(expected.api.httpStatus);
    const body = await res.json();
    expect(body.content).toBe('');
  });

  test('SECTION-05 (API) - rechaza un nombre que supere el máximo permitido (50 caracteres)', async ({
    request,
  }) => {
    const { input, expected } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-05');
    const courseId = await firstCourseId(request);

    const res = await request.post(`/api/courses/${courseId}/sections`, {
      data: { name: input.name, type: input.type, content: input.content },
    });

    expect(res.status()).toBe(expected.httpStatus);
    const body = await res.json();
    expect(body.error).toBe(expected.apiErrorMessage);
  });

  test('SECTION-06 (API) - rechaza un contenido que supere el máximo permitido (500 caracteres)', async ({
    request,
  }) => {
    const { input, expected } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-06');
    const courseId = await firstCourseId(request);

    const res = await request.post(`/api/courses/${courseId}/sections`, {
      data: { name: Data.unique(input.name), type: input.type, content: input.content },
    });

    expect(res.status()).toBe(expected.httpStatus);
    const body = await res.json();
    expect(body.error).toBe(expected.apiErrorMessage);
  });

  test('SECTION-07 (API) - rechaza un tipo no soportado', async ({ request }) => {
    const { input, expected } = await Data.getCase(SECTIONS_DATA_FILE, 'SECTION-07');
    const courseId = await firstCourseId(request);

    const res = await request.post(`/api/courses/${courseId}/sections`, {
      data: { name: Data.unique(input.name), type: input.type, content: input.content },
    });

    expect(res.status()).toBe(expected.httpStatus);
    const body = await res.json();
    expect(body.error).toBe(expected.apiErrorMessage);
  });
});
