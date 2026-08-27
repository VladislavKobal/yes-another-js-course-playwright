import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByRole("link", { name: "Sign in" });
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
}
