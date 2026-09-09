import { test } from "../fixture";
import { STORAGE_STATE_PATH } from "../utils/constants";

test.describe("Authentication setup", () => {
  test("Log in and save session", async ({ app }) => {
    await app.loginPage.goto();
    await app.loginPage.login(
      "customer@practicesoftwaretesting.com",
      "welcome01",
    );

    await app.page.context().storageState({ path: STORAGE_STATE_PATH });
  });
});
