import { Preferences } from '../poms/preferences';

export class PreferencesTask {
  constructor(private readonly preferences: Preferences) {}

  async toggleCompactMode(): Promise<void> {
    await this.preferences.compactModeToggle.click();
  }

  async expectCompactModeEnabled(): Promise<void> {
    await this.preferences.compactModeToggle.expectText('Desactivar modo compacto');
  }

  async expectCompactModeDisabled(): Promise<void> {
    await this.preferences.compactModeToggle.expectText('Activar modo compacto');
  }
}
