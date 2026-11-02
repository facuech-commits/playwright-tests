import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';
import { Toast } from 'tests/modules/shell/poms/toast';

export class CoursesForm {
  readonly nameInput: Element;
  readonly descriptionInput: Element;
  readonly submitButton: Element;
  readonly cancelButton: Element;
  readonly message: Element;
  readonly toast: Toast;

  constructor(private readonly app: App) {
    this.nameInput = app.byTestId('modal-course-name');
    this.descriptionInput = app.byTestId('modal-course-description');
    this.submitButton = app.byTestId('modal-submit');
    this.cancelButton = app.byTestId('modal-cancel');
    this.message = app.byTestId('modal-msg');
    this.toast = new Toast(app);
  }
}
