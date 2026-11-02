import { Toast } from '../poms/toast';

export class ToastTask {
  constructor(private readonly toast: Toast) {}

  async expectMessage(message: string): Promise<void> {
    await this.toast.element.expectText(message);
  }
}
