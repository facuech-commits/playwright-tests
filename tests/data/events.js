import { USERS } from './users.js';

export const EVENTS_CASES = [
  {
    id: 'CP04',
    description: 'Filtrar eventos por categoría Gaming',
    input: { user: USERS.TESTER_15.user, pass: USERS.TESTER_15.pass, category: 'Gaming' },
    expected: { mustInclude: 'eSports Challenge' },
  },
  {
    id: 'CP05',
    description: 'Buscar un evento por nombre',
    input: { user: USERS.TESTER_15.user, pass: USERS.TESTER_15.pass, search: 'Rock' },
    expected: { mustAppear: 'Montevideo Rock' },
  },
  {
    id: 'CP06',
    description: 'Navegar la paginación del listado',
    input: { user: USERS.TESTER_15.user, pass: USERS.TESTER_15.pass, category: 'Todas' },
    expected: { lastPage: '4' },
  },
  {
    id: 'CP07',
    description: 'El detalle de un evento coincide con su tarjeta',
    input: { user: USERS.TESTER_15.user, pass: USERS.TESTER_15.pass, search: 'Montevideo Rock' },
  },
];

export default EVENTS_CASES;
