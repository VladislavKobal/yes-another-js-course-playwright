import { Page, Locator, expect } from "@playwright/test";

export class AccountPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "My account" });
  }

  async expectLoaded(expectedUserName: string): Promise<void> {
    await expect(this.page).toHaveURL("/account");
    await expect(this.heading).toBeVisible();
    await expect(this.page.getByText(expectedUserName)).toBeVisible();
  }
}
