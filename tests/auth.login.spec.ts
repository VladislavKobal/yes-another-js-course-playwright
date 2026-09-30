import { test } from "../fixture";
import { STORAGE_STATE_PATH } from "../utils/constants";
import { requireEnv } from "../utils/env";

test.describe("Authentication setup (legacy - UI login + storageState)", () => {
  test.skip("Log in and save session", async ({ app }) => {
    await app.loginPage.goto();
    await app.loginPage.login(
      requireEnv("USER_EMAIL"),
      requireEnv("USER_PASSWORD"),
    );
    await app.page.context().storageState({ path: STORAGE_STATE_PATH });
  });
});
