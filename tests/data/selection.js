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
  {
    id: 'CP09',
    description: 'Un evento sin stock no se puede agregar al carrito',
    input: { user: USERS.TESTER_15.user, pass: USERS.TESTER_15.pass, search: 'eSports Challenge' },
    expected: {
      stock: '0',
      cardStock: '0 entradas disponibles',
      status: 'Agotado',
      cartCount: '0',
    },
  },
  {
    id: 'CP10',
    description: 'Cálculo de subtotal y total en el carrito',
    input: {
      user: USERS.TESTER_15.user,
      pass: USERS.TESTER_15.pass,
      event: 'Festival de Folklore Andresito',
    },
    expected: {
      price: '$500 por entrada',
      quantity: '3',
      unitPrice: '$500 c/u',
      subtotal: '$1.500',
      discount: '-$0',
      total: '$1.500',
      payButton: 'Pagar $1.500',
    },
  },
  {
    id: 'CP11',
    description: 'Modificar la cantidad y vaciar el carrito',
    input: {
      user: USERS.TESTER_15.user,
      pass: USERS.TESTER_15.pass,
      event: 'Festival de Folklore Andresito',
    },
    expected: {
      quantity: '2',
      subtotal: '$1.000',
      quantityAfterPlus: '3',
      subtotalAfterPlus: '$1.500',
      cartCount: '0',
    },
  },
  {
    id: 'CP12',
    description: 'Código promocional inválido',
    input: {
      user: USERS.TESTER_15.user,
      pass: USERS.TESTER_15.pass,
      event: 'Festival de Folklore Andresito',
      promo: 'CODIGOFALSO123',
    },
    expected: { subtotal: '$500', discount: '-$0', total: '$500' },
  },
];

export default SELECTION_CASES;
