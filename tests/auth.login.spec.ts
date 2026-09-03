import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { STORAGE_STATE_PATH } from "../utils/constants";

test.describe("Authentication setup", () => {
  test.skip("Log in and save session", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("customer@practicesoftwaretesting.com", "welcome01");

    await page.context().storageState({ path: STORAGE_STATE_PATH });
  });
});
