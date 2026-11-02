import { Element } from 'tests/core/Element';
import { ToastTask } from 'tests/modules/shell/tasks/toast';
import { CoursesForm } from '../poms/courses.form';

export class CoursesFormTask {
  private readonly toastTask: ToastTask;

  constructor(private readonly coursesForm: CoursesForm) {
    this.toastTask = new ToastTask(coursesForm.toast);
  }

  async open(trigger: Element): Promise<void> {
    await trigger.click();
  }

  async fillName(name: string): Promise<void> {
    await this.coursesForm.nameInput.fill(name);
  }

  async fillDescription(description: string): Promise<void> {
    await this.coursesForm.descriptionInput.fill(description);
  }

  async submit(): Promise<void> {
    await this.coursesForm.submitButton.click();
  }

  async cancel(): Promise<void> {
    await this.coursesForm.cancelButton.click();
  }

  async addCourse(triggerButton: Element, name: string, description: string): Promise<void> {
    await this.open(triggerButton);
    await this.fillName(name);
    await this.fillDescription(description);
    await this.submit();
  }

  async expectSuccessMessage(message: string): Promise<void> {
    await this.toastTask.expectMessage(message);
  }

  async expectErrorMessage(message: string): Promise<void> {
    await this.coursesForm.message.expectText(message);
  }

  async expectOpen(): Promise<void> {
    await this.coursesForm.nameInput.expectVisible();
  }

  async expectClosed(): Promise<void> {
    await this.coursesForm.nameInput.expectHidden();
  }
}
