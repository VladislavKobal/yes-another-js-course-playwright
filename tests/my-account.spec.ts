import { test } from "@playwright/test";
import { AccountPage } from "../pages/AccountPage";
import { STORAGE_STATE_PATH } from "../utils/constants";

test.describe("My account (logged-in user)", () => {
  test.use({ storageState: STORAGE_STATE_PATH });

  test("Account page loads for an already logged-in user", async ({ page }) => {
    const accountPage = new AccountPage(page);

    await page.goto("/account");
    await accountPage.expectLoaded();
  });
});
