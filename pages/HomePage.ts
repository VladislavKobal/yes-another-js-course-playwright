import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signInLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByRole("link", { name: "Sign in" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async goToLogin() {
    await this.signInLink.click();
  }
}
