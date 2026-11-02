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
