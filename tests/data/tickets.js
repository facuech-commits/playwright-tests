import { USERS } from './users.js';

export const TICKETS_CASES = [
  {
    id: 'CP15',
    description: 'La entrada no muestra datos sensibles de la tarjeta',
    input: { user: USERS.TESTER_15.user, pass: USERS.TESTER_15.pass },
    expected: {
      event: 'Montevideo Rock',
      date: '24/10/2026 · Velódromo',
      code: 'EV-10482-01',
      owner: 'tester15',
      cardNumber: '4111 1111 1111 1111',
      validationCode: 'Código de validación',
      balance: 'Saldo disponible',
    },
  },
];

export default TICKETS_CASES;
