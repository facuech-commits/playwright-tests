import { test } from 'tests/fixtures/base.fixture';
import { Data } from 'tests/core/Data';
import { PURCHASE_DATA_FILE } from '../../../data/paths.js';

test.describe('Compra', () => {
  test('CP13 - Compra completa de punta a punta', async ({
    loginFormTask,
    menuTask,
    eventsListTask,
    eventDetailTask,
    cartTask,
    paymentTask,
    ticketsListTask,
  }) => {
    // falla porque en mis entradas aparece una sola entrada en vez de dos (ver casos de prueba)
    const { input, expected } = await Data.getCase(PURCHASE_DATA_FILE, 'CP13');

    await loginFormTask.login(input.user, input.pass);
    await menuTask.goToEvents();
    await eventsListTask.expectListVisible();

    await eventsListTask.search(input.search);
    await eventsListTask.expectCardStock(input.search, expected.stock);

    await eventsListTask.openDetail(input.search);
    await eventDetailTask.increase();
    await eventDetailTask.expectQuantity(expected.quantity);
    await eventDetailTask.addToCart();
    await menuTask.expectCartNotEmpty();

    await menuTask.goToCart();
    await cartTask.expectItem(input.search, expected.unitPrice, expected.quantity);
    await cartTask.expectSummary(expected.subtotal, expected.discount, expected.total);

    await cartTask.continueToPayment();
    await paymentTask.expectTotal(expected.total, expected.payButton);

    await paymentTask.pay(input.method, input.cardId);
    await paymentTask.expectConfirmed(expected.title, expected.summary);
    await menuTask.expectCartCount(expected.cartCount);

    await paymentTask.viewTicket();
    await ticketsListTask.expectTicket(input.search, expected.date, expected.owner);

    await menuTask.goToTickets();
    await ticketsListTask.expectTicketCount(input.search, expected.tickets);

    await menuTask.goToEvents();
    await eventsListTask.search(input.search);
    await eventsListTask.expectCardStock(input.search, expected.stockAfter);
  });
});
