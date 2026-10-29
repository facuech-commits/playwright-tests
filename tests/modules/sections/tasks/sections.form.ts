import { Element } from 'tests/core/Element';
import { ToastTask } from 'tests/modules/shell/tasks/toast';
import { SectionsForm, SectionType } from '../poms/sections.form';

export class SectionsFormTask {
  private readonly toastTask: ToastTask;

  constructor(private readonly sectionsForm: SectionsForm) {
    this.toastTask = new ToastTask(sectionsForm.toast);
  }

  async open(trigger: Element): Promise<void> {
    await trigger.click();
  }

  async fillName(name: string): Promise<void> {
    await this.sectionsForm.nameInput.fill(name);
  }

  async selectType(type: SectionType): Promise<void> {
    await this.sectionsForm.typeSelect.selectOption(type);
  }

  async fillContent(content: string): Promise<void> {
    await this.sectionsForm.contentInput.fill(content);
  }

  async submit(): Promise<void> {
    await this.sectionsForm.submitButton.click();
  }

  async cancel(): Promise<void> {
    await this.sectionsForm.cancelButton.click();
  }

  async addSection(
    triggerButton: Element,
    name: string,
    type: SectionType,
    content: string,
  ): Promise<void> {
    await this.open(triggerButton);
    await this.fillName(name);
    await this.selectType(type);
    await this.fillContent(content);
    await this.submit();
  }

  async expectSuccessMessage(message: string): Promise<void> {
    await this.toastTask.expectMessage(message);
  }

  async expectErrorMessage(message: string): Promise<void> {
    await this.sectionsForm.message.expectText(message);
  }

  async expectOpen(): Promise<void> {
    await this.sectionsForm.nameInput.expectVisible();
  }

  async expectClosed(): Promise<void> {
    await this.sectionsForm.nameInput.expectHidden();
  }
}
