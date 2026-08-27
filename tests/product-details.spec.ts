import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";

test.describe("Product details", () => {
  test("Verify user can view product details", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();

    await homePage.selectProduct("Combination Pliers");

    await productPage.expectLoaded("Combination Pliers", "14.15");
  });
});
