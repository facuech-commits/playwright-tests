import { expect } from '@playwright/test';
import { EventsList } from '../poms/events.list';

export class EventsListTask {
  constructor(private readonly eventsList: EventsList) {}

  async search(text: string): Promise<void> {
    await this.eventsList.searchInput.fill(text);
  }

  async selectCategory(name: string): Promise<void> {
    await this.eventsList.categoryButton(name).click();
  }

  async expectCategorySelected(name: string): Promise<void> {
    const locator = await this.eventsList.categoryButton(name).raw();
    await expect(locator).toHaveClass(/active/);
  }

  async expectSearchValue(text: string): Promise<void> {
    await this.eventsList.searchInput.expectValue(text);
  }

  async getFirstCardData() {
    const card = this.eventsList.cards.nth(0);
    return {
      title: ((await card.cssChild('h3').text()) ?? '').trim(),
      meta: ((await card.cssChild('.meta').text()) ?? '').trim(),
      stock: ((await card.cssChild('.stock-line').text()) ?? '').trim(),
      price: ((await card.cssChild('.price').text()) ?? '').trim(),
    };
  }

  async openFirstDetail(): Promise<void> {
    await this.eventsList.cards.nth(0).cssChild('button:has-text("Ver detalle")').click();
  }

  async openDetail(title: string): Promise<void> {
    await this.eventsList.cards.filter(title).cssChild('button:has-text("Ver detalle")').click();
  }

  async expectCardSoldOut(title: string, stock: string, status: string): Promise<void> {
    const card = this.eventsList.cards.filter(title);
    await expect(await card.cssChild('.stock-line').raw()).toContainText(stock);
    await card.cssChild('.chip').filter(status).expectVisible();
  }

  async expectListVisible(): Promise<void> {
    await this.eventsList.cards.nth(0).expectVisible();
  }

  async expectEventVisible(title: string): Promise<void> {
    await this.eventsList.cards.filter(title).expectVisible();
  }

  async expectAllCardsHaveCategory(name: string): Promise<void> {
    const total = await this.eventsList.cards.count();
    expect(total, 'no hay eventos en la lista').toBeGreaterThan(0);
    await this.eventsList.cards.cssChild(`.category-chip:text-is("${name}")`).expectCount(total);
  }

  async expectAllTitlesContain(text: string): Promise<void> {
    const titles = await (await this.eventsList.cards.cssChild('h3').raw()).allTextContents();
    expect(titles.length, 'no hay eventos en la lista').toBeGreaterThan(0);
    for (const title of titles) {
      expect(title.toLowerCase()).toContain(text.toLowerCase());
    }
  }

  async expectCountMatchesVisibleCards(): Promise<void> {
    const total = await this.eventsList.cards.count();
    const text = total === 1 ? '1 evento encontrado' : `${total} eventos encontrados`;
    await this.eventsList.countLabel.expectText(text);
  }

  async goToPage(text: string): Promise<void> {
    await this.eventsList.pageButton(text).click();
  }

  async expectPageActive(text: string): Promise<void> {
    const locator = await this.eventsList.pageButton(text).raw();
    await expect(locator).toHaveClass(/active/);
  }

  async expectPageButtonDisabled(text: string): Promise<void> {
    const locator = await this.eventsList.pageButton(text).raw();
    await expect(locator).toBeDisabled();
  }

  async firstEventTitle(): Promise<string> {
    return ((await this.eventsList.cards.nth(0).cssChild('h3').text()) ?? '').trim();
  }

  async expectFirstEventNot(title: string): Promise<void> {
    const locator = await this.eventsList.cards.nth(0).cssChild('h3').raw();
    await expect(locator).not.toHaveText(title);
  }
}
