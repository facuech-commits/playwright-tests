import { USERS } from './users.js';

export const PURCHASE_CASES = [
  {
    id: 'CP13',
    description: 'Compra completa de punta a punta',
    input: {
      user: USERS.TESTER_15.user,
      pass: USERS.TESTER_15.pass,
      search: 'Uruguay Gaming Fest',
      method: 'Tarjeta',
      cardId: 'TEST-VISA-01',
    },
    expected: {
      stock: '50 entradas disponibles',
      quantity: '2',
      unitPrice: '$500 c/u',
      subtotal: '$1.000',
      discount: '-$0',
      total: '$1.000',
      payButton: 'Pagar $1.000',
      title: '¡Compra confirmada!',
      summary: 'Uruguay Gaming Fest · 2 entrada(s) · $1.000',
      cartCount: '0',
      date: '31/10/2026 · LATU',
      owner: 'tester15',
      tickets: 2,
      stockAfter: '48 entradas disponibles',
    },
  },
  {
    id: 'CP14',
    description: 'Pago sin identificador de tarjeta',
    input: {
      user: USERS.TESTER_15.user,
      pass: USERS.TESTER_15.pass,
      event: 'Festival de Folklore Andresito',
      method: 'Tarjeta',
    },
    expected: {
      total: '$500',
      payButton: 'Pagar $500',
      alertMessage: 'Ingresá un identificador de prueba.',
      cartCount: '1',
    },
  },
];

export default PURCHASE_CASES;
