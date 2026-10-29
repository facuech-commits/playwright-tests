import { test as base, expect } from '@playwright/test';
import { App, AppConfig } from 'tests/core/App';
import { Env } from 'tests/core/Env';
import { LoginForm } from 'tests/modules/login/poms/login.form';
import { Dashboard } from 'tests/modules/login/poms/dashboard';
import { CoursesList } from 'tests/modules/courses/poms/courses.list';
import { CoursesForm } from 'tests/modules/courses/poms/courses.form';
import { SectionsList } from 'tests/modules/sections/poms/sections.list';
import { SectionsForm } from 'tests/modules/sections/poms/sections.form';
import { Spinner } from 'tests/modules/shell/poms/spinner';
import { SpinnerTask } from 'tests/modules/shell/tasks/spinner';
import { LoginFormTask } from 'tests/modules/login/tasks/login.form';
import { DashboardTask } from 'tests/modules/login/tasks/dashboard';
import { CoursesListTask } from 'tests/modules/courses/tasks/courses.list';
import { CoursesFormTask } from 'tests/modules/courses/tasks/courses.form';
import { SectionsListTask } from 'tests/modules/sections/tasks/sections.list';
import { SectionsFormTask } from 'tests/modules/sections/tasks/sections.form';
import { Profile } from 'tests/modules/profile/poms/profile';
import { ProfileTask } from 'tests/modules/profile/tasks/profile';
import { Preferences } from 'tests/modules/shell/poms/preferences';
import { PreferencesTask } from 'tests/modules/shell/tasks/preferences';

type Fixtures = {
  app: App;
  loginForm: LoginForm;
  dashboard: Dashboard;
  coursesList: CoursesList;
  coursesForm: CoursesForm;
  sectionsList: SectionsList;
  sectionsForm: SectionsForm;
  spinner: Spinner;
  spinnerTask: SpinnerTask;
  profile: Profile;
  preferences: Preferences;
  loginFormTask: LoginFormTask;
  dashboardTask: DashboardTask;
  coursesListTask: CoursesListTask;
  coursesFormTask: CoursesFormTask;
  sectionsListTask: SectionsListTask;
  sectionsFormTask: SectionsFormTask;
  profileTask: ProfileTask;
  preferencesTask: PreferencesTask;
};

const appConfig: Omit<AppConfig, 'baseUrl'> = {
  highlightCss: Env.str('HIGHLIGHT_CSS', ''),
  slowMo: Number(Env.str('SLOW_MO', '0')),
};

const spinnerTimeoutMs = Number(Env.str('SPINNER_TIMEOUT', '30000'));

export const test = base.extend<Fixtures>({
  app: async ({ page, baseURL }, use) => {
    await use(new App(page, { ...appConfig, baseUrl: baseURL! }));
  },

  loginForm: async ({ app }, use) => {
    await use(new LoginForm(app));
  },

  dashboard: async ({ app }, use) => {
    await use(new Dashboard(app));
  },

  coursesList: async ({ app }, use) => {
    await use(new CoursesList(app));
  },

  coursesForm: async ({ app }, use) => {
    await use(new CoursesForm(app));
  },

  sectionsList: async ({ app }, use) => {
    await use(new SectionsList(app));
  },

  sectionsForm: async ({ app }, use) => {
    await use(new SectionsForm(app));
  },

  spinner: async ({ app }, use) => {
    await use(new Spinner(app));
  },

  spinnerTask: async ({ spinner }, use) => {
    await use(new SpinnerTask(spinner, spinnerTimeoutMs));
  },

  profile: async ({ app }, use) => {
    await use(new Profile(app));
  },

  preferences: async ({ app }, use) => {
    await use(new Preferences(app));
  },

  loginFormTask: async ({ loginForm }, use) => {
    await use(new LoginFormTask(loginForm));
  },

  dashboardTask: async ({ dashboard }, use) => {
    await use(new DashboardTask(dashboard));
  },

  coursesListTask: async ({ coursesList }, use) => {
    await use(new CoursesListTask(coursesList));
  },

  coursesFormTask: async ({ coursesForm }, use) => {
    await use(new CoursesFormTask(coursesForm));
  },

  sectionsListTask: async ({ sectionsList }, use) => {
    await use(new SectionsListTask(sectionsList));
  },

  sectionsFormTask: async ({ sectionsForm }, use) => {
    await use(new SectionsFormTask(sectionsForm));
  },

  profileTask: async ({ profile }, use) => {
    await use(new ProfileTask(profile));
  },

  preferencesTask: async ({ preferences }, use) => {
    await use(new PreferencesTask(preferences));
  },
});

test.beforeEach(async ({ loginForm }) => {
  await loginForm.goto();
});

export { expect };
