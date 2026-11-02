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
    input: {
      usuario: USERS.TESTER_15.user,
      clave: USERS.TESTER_15.pass,
      categoria: 'Todas',
      ultimaPagina: '4',
    },
  },
];

export default EVENTS_CASES;
