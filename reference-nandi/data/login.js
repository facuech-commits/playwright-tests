import { USERS } from './users.js';

export const LOGIN_CASES = [
  {
    id: 'LOGIN-01',
    description: 'Login vacío: no se completa usuario ni contraseña',
    input: { user: '', pass: '' },
  },
  {
    id: 'LOGIN-02',
    description: 'Login solo con usuario (valor válido), sin contraseña',
    input: { user: USERS.ADMIN.user, pass: '' },
  },
  {
    id: 'LOGIN-03',
    description: 'Login solo con contraseña (valor válido), sin usuario',
    input: { user: '', pass: USERS.ADMIN.pass },
  },
  {
    id: 'LOGIN-04',
    description: 'Usuario y contraseña no coinciden con ningún usuario existente',
    input: { user: 'Inexistente', pass: 'ClaveFalsa123' },
    expected: {
      uiErrorMessage: 'Usuario o contraseña incorrectos',
    },
  },
  {
    id: 'LOGIN-05',
    description: 'Login exitoso como administrador',
    input: { user: USERS.ADMIN.user, pass: USERS.ADMIN.pass },
    expected: { role: USERS.ADMIN.role },
  },
  {
    id: 'LOGIN-06',
    description: 'Login exitoso como escritor (writer)',
    input: { user: USERS.WRITER.user, pass: USERS.WRITER.pass },
    expected: { role: USERS.WRITER.role },
  },
];

export default LOGIN_CASES;
