export const COURSE_CASES = [
  {
    id: 'COURSE-01',
    description: 'Alta de curso con nombre y descripción válidos',
    input: { name: 'Curso de prueba', description: 'Descripción de prueba para el curso.' },
    expected: { httpStatus: 201, uiSuccessMessage: 'Curso creado' },
  },
  {
    id: 'COURSE-02',
    description: 'No permite crear un curso sin nombre (con descripción)',
    input: { name: '', description: 'Descripción válida, sin nombre de curso.' },
    expected: {
      ui: {
        uiErrorMessage: 'El nombre es obligatorio',
      },
      api: {
        httpStatus: 400,
        apiErrorMessage: 'name and description are required',
      },
    },
  },
  {
    id: 'COURSE-03',
    description: 'No permite crear un curso con nombre pero sin descripción',
    input: { name: 'Curso sin descripción', description: '' },
    expected: {
      ui: {
        uiErrorMessage: 'La descripción es obligatoria',
      },
      api: {
        httpStatus: 400,
        apiErrorMessage: 'name and description are required',
      },
    },
  },
  {
    id: 'COURSE-04',
    description: `No permite un nombre de curso que supere el máximo permitido (50 caracteres)`,
    input: {
      name: 'A bA bA bA bA bA bA bA bA bA bA bA bA bA bA bA bA b',
      description: 'Descripción válida.',
    },
    expected: {
      httpStatus: 400,
      apiErrorMessage: `name must be at most 50 characters`,
    },
  },
  {
    id: 'COURSE-05',
    description: `No permite crear un curso con nombre correcto pero descripción que supera el máximo permitido (500 caracteres)`,
    input: {
      name: 'Curso con descripción muy larga',
      description:
        'B aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB a',
    },
    expected: {
      httpStatus: 400,
      apiErrorMessage: `description must be at most 500 characters`,
    },
  },
];

export default COURSE_CASES;
