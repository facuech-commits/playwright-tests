import { LoginForm } from '../poms/login.form';

export class LoginFormTask {
  constructor(private readonly loginForm: LoginForm) {}

  async goto(): Promise<void> {
    await this.loginForm.goto();
  }

  async fillUser(value: string): Promise<void> {
    await this.loginForm.userInput.fill(value);
  }

  async fillPass(value: string): Promise<void> {
    await this.loginForm.passInput.fill(value);
  }

  async submit(): Promise<void> {
    await this.loginForm.submitButton.click();
  }

  async login(user: string, pass: string): Promise<void> {
    await this.fillUser(user);
    await this.fillPass(pass);
    await this.submit();
  }

  // el error de login sale en un alert(), hay que escucharlo antes del click
  async submitExpectingAlert(): Promise<string> {
    const page = this.loginForm.app.raw;
    const dialogMessage = new Promise<string>((resolve) => {
      page.once('dialog', async (dialog) => {
        resolve(dialog.message());
        await dialog.accept();
      });
    });
    const submit = await this.loginForm.submitButton.raw();
    await submit.click();
    return dialogMessage;
  }

  async expectUserValue(value: string): Promise<void> {
    await this.loginForm.userInput.expectValue(value);
  }

  async expectPassValue(value: string): Promise<void> {
    await this.loginForm.passInput.expectValue(value);
  }

  async expectStillOnLoginScreen(): Promise<void> {
    await this.loginForm.userInput.expectVisible();
  }

  async expectLoggedIn(): Promise<void> {
    await this.loginForm.app.expectUrl(/#\/events/);
  }
}
