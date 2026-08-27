import { Page, Locator, expect } from "@playwright/test";

export class AccountPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly userName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "My account" });
    this.userName = page.getByText("QA QA");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL("/account");
    await expect(this.heading).toBeVisible();
    await expect(this.userName).toBeVisible();
  }
}
