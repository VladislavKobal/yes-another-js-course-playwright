import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItemTitles: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemTitles = page.getByTestId("product-title");
    this.proceedToCheckoutButton = page.getByRole("button", {
      name: "Proceed to checkout",
    });
  }

  async expectLoaded(productTitle: string, itemCount: number): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout/);
    await expect(this.cartItemTitles).toHaveCount(itemCount);
    await expect(this.cartItemTitles.first()).toHaveText(productTitle);
    await expect(this.proceedToCheckoutButton).toBeVisible();
  }
}
