import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';
import { Toast } from 'tests/modules/shell/poms/toast';

export type SectionType = 'leccion' | 'cuestionario' | 'recurso';

export class SectionsForm {
  readonly nameInput: Element;
  readonly typeSelect: Element;
  readonly contentInput: Element;
  readonly submitButton: Element;
  readonly cancelButton: Element;
  readonly message: Element;
  readonly toast: Toast;

  constructor(private readonly app: App) {
    this.nameInput = app.byTestId('modal-section-name');
    this.typeSelect = app.byTestId('modal-section-type');
    this.contentInput = app.byTestId('modal-section-content');
    this.submitButton = app.byTestId('modal-submit');
    this.cancelButton = app.byTestId('modal-cancel');
    this.message = app.byTestId('modal-msg');
    this.toast = new Toast(app);
  }
}
