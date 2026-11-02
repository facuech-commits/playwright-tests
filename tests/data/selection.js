import { USERS } from './users.js';

export const SELECTION_CASES = [
  {
    id: 'CP08',
    description: 'Límites de cantidad en el detalle del evento (1 a 4)',
    input: {
      user: USERS.TESTER_15.user,
      pass: USERS.TESTER_15.pass,
      category: 'Deportes',
      event: 'Fútbol 5 Cup',
    },
    expected: {
      min: '1',
      max: '4',
      helpText: 'Podés seleccionar entre 1 y 4 entradas, sin superar el stock disponible.',
    },
  },
];

export default SELECTION_CASES;
