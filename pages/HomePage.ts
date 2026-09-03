import { Page, Locator } from "@playwright/test";
import { Category } from "../emun/category.enum";

export class HomePage {
  readonly page: Page;
  readonly signInLink: Locator;
  readonly cartIcon: Locator;
  readonly cartQuantityBadge: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByRole("link", { name: "Sign in" });

    this.cartIcon = page.getByTestId("nav-cart");
    this.cartQuantityBadge = page.getByTestId("cart-quantity");

    this.sortDropdown = page.getByTestId("sort");

    this.productNames = page.getByTestId("product-name");
    this.productPrices = page.getByTestId("unit-price");
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async goToLogin(): Promise<void> {
    await this.signInLink.click();
  }

  async selectProduct(productName: string): Promise<void> {
    await this.page.getByText(productName, { exact: true }).click();
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async sortBy(value: string): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }

  async filterByCategory(itemName: string): Promise<void> {
    await this.page.getByRole("checkbox", { name: itemName }).check();
  }

  async expandCategoryGroup(group: Category): Promise<void> {
    const groupHeader = this.page.getByRole("button", { name: group });
    if (await groupHeader.isVisible()) {
      await groupHeader.click();
    }
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const rawPrices = await this.productPrices.allTextContents();
    return rawPrices.map((price) => parseFloat(price.replace(/[^0-9.]/g, "")));
  }
}
