import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';
import { Toast } from 'tests/modules/shell/poms/toast';

export class SectionsList {
  readonly sectionItems: Element;
  readonly addSectionButton: Element;
  readonly toast: Toast;

  constructor(private readonly app: App) {
    this.sectionItems = app.byTestId('section-item');
    this.addSectionButton = app.byTestId('add-section-btn');
    this.toast = new Toast(app);
  }

  byName(name: string): Element {
    return this.sectionItems.filter(name);
  }

  editButton(name: string): Element {
    return this.byName(name).child('edit-section-btn');
  }

  deleteButton(name: string): Element {
    return this.byName(name).child('delete-section-btn');
  }
}
