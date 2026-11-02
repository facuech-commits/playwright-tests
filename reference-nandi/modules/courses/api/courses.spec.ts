import { test, expect } from 'tests/fixtures/base.fixture';
import { Data } from 'tests/core/Data';
import { COURSES_DATA_FILE } from '../../../data/paths.js';

test.describe('Cursos - API directa (casos no alcanzables desde la UI)', () => {
  test('COURSE-02 (API) - rechaza un curso sin nombre', async ({ request }) => {
    const { input, expected } = await Data.getCase(COURSES_DATA_FILE, 'COURSE-02');

    const res = await request.post('/api/courses', {
      data: { name: '', description: input.description },
    });

    expect(res.status()).toBe(expected.api.httpStatus);
    const body = await res.json();
    expect(body.error).toBe(expected.api.apiErrorMessage);
  });

  test('COURSE-03 (API) - rechaza un curso sin descripción', async ({ request }) => {
    const { input, expected } = await Data.getCase(COURSES_DATA_FILE, 'COURSE-03');

    const res = await request.post('/api/courses', {
      data: { name: Data.unique(input.name), description: '' },
    });

    expect(res.status()).toBe(expected.api.httpStatus);
    const body = await res.json();
    expect(body.error).toBe(expected.api.apiErrorMessage);
  });

  test('COURSE-04 (API) - rechaza un nombre que supere el máximo permitido (50 caracteres)', async ({
    request,
  }) => {
    const { input, expected } = await Data.getCase(COURSES_DATA_FILE, 'COURSE-04');

    const res = await request.post('/api/courses', {
      data: { name: input.name, description: input.description },
    });

    expect(res.status()).toBe(expected.httpStatus);
    const body = await res.json();
    expect(body.error).toBe(expected.apiErrorMessage);
  });

  test('COURSE-05 (API) - rechaza una descripción que supere el máximo permitido (500 caracteres)', async ({
    request,
  }) => {
    const { input, expected } = await Data.getCase(COURSES_DATA_FILE, 'COURSE-05');

    const res = await request.post('/api/courses', {
      data: { name: Data.unique(input.name), description: input.description },
    });

    expect(res.status()).toBe(expected.httpStatus);
    const body = await res.json();
    expect(body.error).toBe(expected.apiErrorMessage);
  });
});
