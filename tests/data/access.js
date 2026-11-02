import { USERS } from './users.js';

export const ACCESS_CASES = [
  {
    id: 'CP01',
    description: 'Login exitoso con usuario válido',
    input: { user: USERS.TESTER_15.user, pass: USERS.TESTER_15.pass },
  },
  {
    id: 'CP02',
    description: 'Login con contraseña incorrecta',
    input: { user: USERS.TESTER_15.user, pass: 'claveIncorrecta' },
    expected: { alertMessage: 'Usuario o contraseña incorrectos.' },
  },
  {
    id: 'CP03',
    description: 'Cerrar sesión y no acceder a una página protegida',
    input: { user: USERS.TESTER_15.user, pass: USERS.TESTER_15.pass },
  },
];

export default ACCESS_CASES;
