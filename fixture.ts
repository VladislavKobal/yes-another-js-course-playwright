import {
  test as base,
  expect,
  Page,
  APIRequestContext,
} from "@playwright/test";
import { App } from "./app/App";
import { loginViaApi } from "./api/Authapi";

type Fixtures = {
  app: App;
  loggedInApp: App;
};

// Підтверджено реальним storageState-файлом для цього сайту: Angular-app
// читає токен саме з localStorage під цим ключем.
const AUTH_TOKEN_STORAGE_KEY = "auth-token";

const DEFAULT_CREDENTIALS = {
  email: "customer@practicesoftwaretesting.com",
  password: "welcome01",
};

export const test = base.extend<Fixtures>({
  app: async ({ page }: { page: Page }, use: (app: App) => Promise<void>) => {
    const app = new App(page);
    await use(app);
  },

  loggedInApp: async (
    { app, request }: { app: App; request: APIRequestContext },
    use: (app: App) => Promise<void>,
  ) => {
    const accessToken = await loginViaApi(request, DEFAULT_CREDENTIALS);

    await app.page.addInitScript(
      ({ key, value }) => {
        window.localStorage.setItem(key, value);
      },
      { key: AUTH_TOKEN_STORAGE_KEY, value: accessToken },
    );

    await use(app);
  },
});

export { expect };
