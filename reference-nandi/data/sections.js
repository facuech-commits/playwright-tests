export const EXISTING_COURSE = 'Introducción a Python';

export const SECTION_MESSAGES = {
  created: 'Sección creada',
  updated: 'Sección actualizada',
  deleted: 'Sección eliminada',
};

export const SECTION_CASES = [
  {
    id: 'SECTION-01',
    description: 'Alta de sección con nombre, tipo y contenido válidos',
    input: { name: 'Introducción al tema', type: 'leccion', content: 'Contenido de la lección.' },
    expected: { httpStatus: 201, uiSuccessMessage: SECTION_MESSAGES.created },
  },
  {
    id: 'SECTION-02',
    description: 'No permite crear una sección sin nombre (con tipo y contenido)',
    input: { name: '', type: 'leccion', content: 'Contenido válido sin nombre de sección.' },
    expected: {
      ui: {
        uiErrorMessage: 'El nombre es obligatorio',
      },
      api: {
        httpStatus: 400,
        apiErrorMessage: 'name is required and type must be one of: cuestionario, leccion, recurso',
      },
    },
  },
  {
    id: 'SECTION-03',
    description: 'No permite crear una sección sin tipo (con nombre y contenido)',
    input: {
      name: 'Sección sin tipo',
      type: '',
      content: 'Contenido válido sin tipo seleccionado.',
    },
    expected: {
      ui: {
        uiErrorMessage: 'Debe seleccionar un tipo de sección',
      },
      api: {
        httpStatus: 400,
        apiErrorMessage: 'name is required and type must be one of: cuestionario, leccion, recurso',
      },
    },
  },
  {
    id: 'SECTION-04',
    description: 'Sección con nombre y tipo válidos, pero sin contenido',
    input: { name: 'Sección sin contenido', type: 'recurso', content: '' },
    expected: {
      ui: {
        uiErrorMessage: 'El contenido es obligatorio',
      },
      api: {
        httpStatus: 201,
      },
    },
  },
  {
    id: 'SECTION-05',
    description: `No permite un nombre de sección que supere el máximo permitido (50 caracteres)`,
    input: {
      name: 'A bA bA bA bA bA bA bA bA bA bA bA bA bA bA bA bA b',
      type: 'leccion',
      content: 'Contenido válido.',
    },
    expected: {
      httpStatus: 400,
      apiErrorMessage: `name must be at most 50 characters`,
    },
  },
  {
    id: 'SECTION-06',
    description: `No permite crear una sección con nombre correcto pero contenido que supera el máximo permitido (500 caracteres)`,
    input: {
      name: 'Sección con contenido muy largo',
      type: 'cuestionario',
      content:
        'B aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB aB a',
    },
    expected: {
      httpStatus: 400,
      apiErrorMessage: `content must be at most 500 characters`,
    },
  },
  {
    id: 'SECTION-07',
    description: 'No permite un tipo de sección con un valor no soportado',
    input: { name: 'Sección con tipo inválido', type: 'video', content: 'Contenido válido.' },
    expected: {
      httpStatus: 400,
      apiErrorMessage: 'name is required and type must be one of: cuestionario, leccion, recurso',
    },
  },
];

export default SECTION_CASES;
