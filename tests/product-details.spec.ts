import { test } from "../fixture";

test.describe("Product details", { tag: "@smoke" }, () => {
  test("Verify user can view product details", async ({ app }) => {
    await app.homePage.goto();
    await app.homePage.selectProduct("Combination Pliers");
    await app.productPage.expectLoaded("Combination Pliers", "14.15");
  });
});
