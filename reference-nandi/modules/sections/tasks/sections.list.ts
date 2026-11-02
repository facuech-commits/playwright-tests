import { ToastTask } from 'tests/modules/shell/tasks/toast';
import { SectionsList } from '../poms/sections.list';

export class SectionsListTask {
  private readonly toastTask: ToastTask;

  constructor(private readonly sectionsList: SectionsList) {
    this.toastTask = new ToastTask(sectionsList.toast);
  }

  async editSection(name: string): Promise<void> {
    await this.sectionsList.editButton(name).click();
  }

  async deleteSection(name: string): Promise<void> {
    await this.sectionsList.deleteButton(name).clickAndAcceptDialog();
  }

  async expectSuccessMessage(message: string): Promise<void> {
    await this.toastTask.expectMessage(message);
  }

  async expectSectionVisible(name: string): Promise<void> {
    await this.sectionsList.byName(name).expectVisible();
  }

  async expectSectionNotVisible(name: string): Promise<void> {
    await this.sectionsList.byName(name).expectCount(0);
  }

  async expectSectionContent(name: string, content: string): Promise<void> {
    await this.sectionsList.byName(name).filter(content).expectVisible();
  }

  async expectAddButtonVisible(): Promise<void> {
    await this.sectionsList.addSectionButton.expectVisible();
  }

  async expectAddButtonHidden(): Promise<void> {
    await this.sectionsList.addSectionButton.expectHidden();
  }

  async expectManageButtonsHidden(name: string): Promise<void> {
    await this.sectionsList.editButton(name).expectCount(0);
    await this.sectionsList.deleteButton(name).expectCount(0);
  }
}
