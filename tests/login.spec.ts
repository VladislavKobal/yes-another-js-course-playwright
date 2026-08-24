import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login", () => {
  test("Verify login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("tatowof536@apdtax.com", "Tatowof536!");
  });
});
