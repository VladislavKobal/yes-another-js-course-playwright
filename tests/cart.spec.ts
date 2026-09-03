import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

test.describe("Cart", () => {
  test("Verify user can add product to cart", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step("Open product page", async () => {
      await homePage.goto();
      await homePage.selectProduct("Slip Joint Pliers");
      await productPage.expectLoaded("Slip Joint Pliers", "9.17");
    });

    await test.step("Add product to cart", async () => {
      await productPage.addToCart();
      await productPage.expectAddedToCart("Product added to shopping cart");
      await expect(homePage.cartQuantityBadge).toHaveText("1");
    });

    await test.step("Verify checkout page", async () => {
      await homePage.goToCart();
      await cartPage.expectLoaded("Slip Joint Pliers", 1);
    });
  });
});
