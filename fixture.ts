import { test as base, expect, Page } from "@playwright/test";
import { App } from "./app/App";

type Fixtures = {
  app: App;
  loggedInApp: App;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }: { page: Page }, use: (app: App) => Promise<void>) => {
    const app = new App(page);
    await use(app);
  },

  loggedInApp: async (
    { app }: { app: App },
    use: (app: App) => Promise<void>,
  ) => {
    await app.loginPage.goto();
    await app.loginPage.login(
      "customer@practicesoftwaretesting.com",
      "welcome01",
    );
    await use(app);
  },
});

export { expect };
