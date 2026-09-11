import { test } from "../fixture";

test.describe("Login", () => {
  test("Verify login with valid credentials", async ({ app }) => {
    await app.loginPage.goto();
    await app.loginPage.login("tatowof536@apdtax.com", "Tatowof536!");

    await app.accountPage.expectLoaded();
  });
});
