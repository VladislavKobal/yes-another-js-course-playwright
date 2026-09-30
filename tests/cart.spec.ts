import { test, expect } from "../fixture";

test.describe("Cart", { tag: "@smoke" }, () => {
  test("Verify user can add product to cart", async ({ app }) => {
    await test.step("Open product page", async () => {
      await app.homePage.goto();
      await app.homePage.selectProduct("Slip Joint Pliers");
      await app.productPage.expectLoaded("Slip Joint Pliers", "9.17");
    });

    await test.step("Add product to cart", async () => {
      await app.productPage.addToCart();
      await app.productPage.expectAddedToCart("Product added to shopping cart");
      await expect(app.homePage.cartQuantityBadge).toHaveText("1");
    });

    await test.step("Verify checkout page", async () => {
      await app.homePage.goToCart();
      await app.cartPage.expectLoaded("Slip Joint Pliers", 1);
    });
  });
});
