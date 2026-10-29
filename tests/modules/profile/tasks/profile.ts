import { Profile } from '../poms/profile';

const ROLE_LABELS = {
  admin: 'Admin',
  writer: 'Writer',
} as const;

type Role = keyof typeof ROLE_LABELS;

export class ProfileTask {
  constructor(private readonly profile: Profile) {}

  async expectProfile(user: string, role: Role): Promise<void> {
    await this.profile.trigger.click();
    await this.profile.usernameValue.expectText(user);
    await this.profile.roleValue.expectText(ROLE_LABELS[role]);
  }

  async close(): Promise<void> {
    await this.profile.closeButton.click();
  }

  async expectClosed(): Promise<void> {
    await this.profile.app.expectPopupClosed(1);
  }
}
