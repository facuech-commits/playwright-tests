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
    const categories = await this.cardCategories();
    expect(categories.length, 'no hay tarjetas visibles para revisar').toBeGreaterThan(0);
    for (const category of categories) {
      expect(category).toBe(name);
    }
  }

  async expectAllTitlesContain(text: string): Promise<void> {
    const titles = await this.cardTitles();
    expect(titles.length, 'no hay tarjetas visibles para revisar').toBeGreaterThan(0);
    for (const title of titles) {
      expect(title.toLowerCase()).toContain(text.toLowerCase());
    }
  }

  async expectCountMatchesVisibleCards(): Promise<void> {
    const countText = (await this.eventsList.countLabel.text())?.trim() ?? '';
    const match = countText.match(/^(\d+)\s+eventos?\s+encontrados?$/);
    if (!match) {
      throw new Error(`No se pudo interpretar el contador de eventos: "${countText}"`);
    }
    await this.eventsList.cards.expectCount(Number(match[1]));
  }

  async clickPagina(texto: string): Promise<void> {
    await this.eventsList.botonPagina(texto).click();
  }

  async verificarPaginaActiva(texto: string): Promise<void> {
    await expect(await this.eventsList.botonPagina(texto).raw()).toHaveClass(/active/);
  }

  async verificarDeshabilitado(texto: string): Promise<void> {
    await expect(await this.eventsList.botonPagina(texto).raw()).toBeDisabled();
  }

  async primerEvento(): Promise<string> {
    return ((await this.eventsList.cards.nth(0).cssChild('h3').text()) ?? '').trim();
  }

  async verificarPrimerEventoDistinto(titulo: string): Promise<void> {
    await expect(await this.eventsList.cards.nth(0).cssChild('h3').raw()).not.toHaveText(titulo);
  }

  private async cardTitles(): Promise<string[]> {
    const cards = await this.eventsList.cards.all();
    const titles: string[] = [];
    for (const card of cards) {
      titles.push(((await card.cssChild('h3').text()) ?? '').trim());
    }
    return titles;
  }

  private async cardCategories(): Promise<string[]> {
    const cards = await this.eventsList.cards.all();
    const categories: string[] = [];
    for (const card of cards) {
      const chip = card.cssChild('.category-chip');
      const hasChip = (await chip.count()) > 0;
      categories.push(hasChip ? ((await chip.text()) ?? '').trim() : '');
    }
    return categories;
  }
}
