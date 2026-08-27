import { Page, Locator, expect } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly addToFavoritesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId("product-name");
    this.productPrice = page.getByTestId("unit-price");
    this.addToCartButton = page.getByTestId("add-to-cart");
    this.addToFavoritesButton = page.getByTestId("add-to-favorites");
  }

  async expectLoaded(name: string, price: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/product/);
    await expect(this.productName).toHaveText(name);
    await expect(this.productPrice).toContainText(price);
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToFavoritesButton).toBeVisible();
  }
}
