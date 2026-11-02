import { Dashboard } from '../poms/dashboard';

const ROLE_LABELS = {
  admin: 'Admin',
  writer: 'Writer',
} as const;

type Role = keyof typeof ROLE_LABELS;

export class DashboardTask {
  constructor(private readonly dashboard: Dashboard) {}

  async logout(): Promise<void> {
    await this.dashboard.logoutButton.click();
  }

  async expectLoggedInAs(user: string, role: Role): Promise<void> {
    await this.dashboard.currentUser.expectText(user);
    await this.dashboard.currentRole.expectText(ROLE_LABELS[role]);
  }

  async expectLoggedOut(): Promise<void> {
    await this.dashboard.app.expectUrl(/login\.html/);
  }
}
