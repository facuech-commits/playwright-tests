import { App } from 'tests/core/App';
import { Element } from 'tests/core/Element';

export class CoursesList {
  readonly courseItems: Element;
  readonly addCourseButton: Element;
  readonly description: Element;

  constructor(private readonly app: App) {
    this.courseItems = app.byTestId('course-item');
    this.addCourseButton = app.byTestId('add-course-btn');
    this.description = app.byTestId('course-detail-description');
  }

  byName(name: string): Element {
    return this.courseItems.filter(name);
  }
}
