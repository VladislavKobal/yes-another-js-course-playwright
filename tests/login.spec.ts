import { test } from "../fixture";

test.describe("Login", { tag: "@smoke" }, () => {
  test("Verify login with valid credentials", async ({ app }) => {
    await app.loginPage.goto();
    await app.loginPage.login("tatowof536@apdtax.com", "Tatowof536!");

    await app.accountPage.expectLoaded("QA QA");
  });
});
