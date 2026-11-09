import { test } from 'tests/fixtures/base.fixture';
import { Data } from 'tests/core/Data';
import { SELECTION_DATA_FILE } from '../../../data/paths.js';

test.describe('Selección y carrito', () => {
  test('CP08 - Límites de cantidad en el detalle del evento (1 a 4)', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
    eventDetailTask,
  }) => {
    // falla porque el + deja pasar de 4 entradas (ver casos de prueba)
    const { input, expected } = await Data.getCase(SELECTION_DATA_FILE, 'CP08');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToEvents();
    await eventsListTask.selectCategory(input.category);
    await eventsListTask.openDetail(input.event);

    await eventDetailTask.expectQuantity(expected.min);
    await eventDetailTask.expectHelpText(expected.helpText);

    await eventDetailTask.decrease();
    await eventDetailTask.expectQuantity(expected.min);

    await eventDetailTask.increase(6);
    await eventDetailTask.expectQuantity(expected.max);

    await eventDetailTask.increase();
    await eventDetailTask.expectQuantity(expected.max);
  });

  test('CP09 - Un evento sin stock no se puede agregar al carrito', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
    eventDetailTask,
  }) => {
    // falla porque el botón para agregar al carrito no se deshabilita cuando el evento está agotado (ver casos de prueba)
    const { input, expected } = await Data.getCase(SELECTION_DATA_FILE, 'CP09');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToEvents();
    await eventsListTask.expectListVisible();
    await menuTask.expectCartCount(expected.cartCount);

    await eventsListTask.search(input.search);
    await eventsListTask.openDetail(input.search);

    await eventDetailTask.expectVisible();
    await eventDetailTask.expectAddToCartDisabled();
    await menuTask.expectCartCount(expected.cartCount);

    await eventDetailTask.expectSoldOut(expected.stock, expected.status);

    await menuTask.goToEvents();
    await eventsListTask.search(input.search);
    await eventsListTask.expectCardSoldOut(input.search, expected.cardStock, expected.status);
  });

  test('CP10 - Cálculo de subtotal y total en el carrito', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
    eventDetailTask,
    cartTask,
    paymentTask,
  }) => {
    const { input, expected } = await Data.getCase(SELECTION_DATA_FILE, 'CP10');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToEvents();
    await eventsListTask.openDetail(input.event);
    await eventDetailTask.expectPrice(expected.price);

    await eventDetailTask.increase(2);
    await eventDetailTask.expectQuantity(expected.quantity);

    await eventDetailTask.addToCart();
    await menuTask.expectCartNotEmpty();

    await menuTask.goToCart();
    await cartTask.expectItem(input.event, expected.unitPrice, expected.quantity);
    await cartTask.expectSummary(expected.subtotal, expected.discount, expected.total);

    await cartTask.continueToPayment();
    await paymentTask.expectTotal(expected.total, expected.payButton);

    await menuTask.goToCart();
    await cartTask.remove();
    await cartTask.expectEmpty();
  });

  test('CP11 - Modificar la cantidad y vaciar el carrito', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
    eventDetailTask,
    cartTask,
  }) => {
    // falla porque al bajar la cantidad el subtotal no se actualiza (ver casos de prueba)
    const { input, expected } = await Data.getCase(SELECTION_DATA_FILE, 'CP11');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToEvents();
    await eventsListTask.openDetail(input.event);
    await eventDetailTask.increase();
    await eventDetailTask.addToCart();
    await menuTask.expectCartNotEmpty();

    await menuTask.goToCart();
    await cartTask.expectQuantityAndSubtotal(expected.quantity, expected.subtotal);

    await cartTask.increase();
    await cartTask.expectQuantityAndSubtotal(
      expected.quantityAfterPlus,
      expected.subtotalAfterPlus,
    );

    await cartTask.decrease();
    await cartTask.expectQuantityAndSubtotal(expected.quantity, expected.subtotal);

    await cartTask.remove();
    await cartTask.expectEmpty();
    await menuTask.expectCartCount(expected.cartCount);
  });

  test('CP12 - Código promocional inválido', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
    eventDetailTask,
    cartTask,
  }) => {
    // falla porque el codigo falso no da error y aplica descuento (ver casos de prueba)
    const { input, expected } = await Data.getCase(SELECTION_DATA_FILE, 'CP12');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToEvents();
    await eventsListTask.openDetail(input.event);
    await eventDetailTask.addToCart();
    await menuTask.expectCartNotEmpty();

    await menuTask.goToCart();
    await cartTask.expectSummary(expected.subtotal, expected.discount, expected.total);

    await cartTask.applyPromo(input.promo);
    await cartTask.expectPromoError();
    await cartTask.expectSummary(expected.subtotal, expected.discount, expected.total);

    await cartTask.remove();
    await cartTask.expectEmpty();
  });
});
