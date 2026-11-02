import { CoursesList } from '../poms/courses.list';

export class CoursesListTask {
  constructor(private readonly coursesList: CoursesList) {}

  async selectCourse(name: string): Promise<void> {
    await this.coursesList.byName(name).click();
  }

  async expectCourseVisible(name: string): Promise<void> {
    await this.coursesList.byName(name).expectVisible();
  }

  async expectCourseNotVisible(name: string): Promise<void> {
    await this.coursesList.byName(name).expectCount(0);
  }

  async expectDescription(text: string): Promise<void> {
    await this.coursesList.description.expectText(text);
  }

  async expectAddButtonVisible(): Promise<void> {
    await this.coursesList.addCourseButton.expectVisible();
  }

  async expectAddButtonHidden(): Promise<void> {
    await this.coursesList.addCourseButton.expectHidden();
  }
}
