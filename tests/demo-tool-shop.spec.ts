import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { AccountPage } from "../pages/AccountPage";

test.describe("Login", () => {
  test("Verify login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    await loginPage.goto();
    await loginPage.login("tatowof536@apdtax.com", "Tatowof536!");

    await accountPage.expectLoaded();
  });
});
