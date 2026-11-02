import { test as base, expect } from '@playwright/test';
import { App, AppConfig } from 'tests/core/App';
import { Env } from 'tests/core/Env';
import { LoginForm } from 'tests/modules/login/poms/login.form';
import { LoginFormTask } from 'tests/modules/login/tasks/login.form';
import { Menu } from 'tests/modules/shell/poms/menu';
import { MenuTask } from 'tests/modules/shell/tasks/menu';
import { EventsList } from 'tests/modules/events/poms/events.list';
import { EventsListTask } from 'tests/modules/events/tasks/events.list';
import { EventDetail } from 'tests/modules/events/poms/event.detail';
import { EventDetailTask } from 'tests/modules/events/tasks/event.detail';
import { Cart } from 'tests/modules/cart/poms/cart';
import { CartTask } from 'tests/modules/cart/tasks/cart';
import { Payment } from 'tests/modules/cart/poms/payment';
import { PaymentTask } from 'tests/modules/cart/tasks/payment';
import { TicketsList } from 'tests/modules/tickets/poms/tickets.list';
import { TicketsListTask } from 'tests/modules/tickets/tasks/tickets.list';

type Fixtures = {
  app: App;
  loginForm: LoginForm;
  loginFormTask: LoginFormTask;
  menu: Menu;
  menuTask: MenuTask;
  eventsList: EventsList;
  eventsListTask: EventsListTask;
  eventDetail: EventDetail;
  eventDetailTask: EventDetailTask;
  cart: Cart;
  cartTask: CartTask;
  payment: Payment;
  paymentTask: PaymentTask;
  ticketsList: TicketsList;
  ticketsListTask: TicketsListTask;
};

const appConfig: Omit<AppConfig, 'baseUrl'> = {
  highlightCss: Env.str('HIGHLIGHT_CSS', ''),
  slowMo: Number(Env.str('SLOW_MO', '0')),
};

export const test = base.extend<Fixtures>({
  app: async ({ page, baseURL }, use) => {
    await use(new App(page, { ...appConfig, baseUrl: baseURL! }));
  },

  loginForm: async ({ app }, use) => {
    await use(new LoginForm(app));
  },

  loginFormTask: async ({ loginForm }, use) => {
    await use(new LoginFormTask(loginForm));
  },

  menu: async ({ app }, use) => {
    await use(new Menu(app));
  },

  menuTask: async ({ menu }, use) => {
    await use(new MenuTask(menu));
  },

  eventsList: async ({ app }, use) => {
    await use(new EventsList(app));
  },

  eventsListTask: async ({ eventsList }, use) => {
    await use(new EventsListTask(eventsList));
  },

  eventDetail: async ({ app }, use) => {
    await use(new EventDetail(app));
  },

  eventDetailTask: async ({ eventDetail }, use) => {
    await use(new EventDetailTask(eventDetail));
  },

  cart: async ({ app }, use) => {
    await use(new Cart(app));
  },

  cartTask: async ({ cart }, use) => {
    await use(new CartTask(cart));
  },

  payment: async ({ app }, use) => {
    await use(new Payment(app));
  },

  paymentTask: async ({ payment }, use) => {
    await use(new PaymentTask(payment));
  },

  ticketsList: async ({ app }, use) => {
    await use(new TicketsList(app));
  },

  ticketsListTask: async ({ ticketsList }, use) => {
    await use(new TicketsListTask(ticketsList));
  },
});

test.beforeEach(async ({ loginFormTask }) => {
  await loginFormTask.goto();
});

export { expect };
