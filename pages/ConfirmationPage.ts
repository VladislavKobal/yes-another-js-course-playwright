import { Page, Locator, expect } from "@playwright/test";

export class ConfirmationPage {
  readonly page: Page;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successMessage = page.getByRole("alert");
  }

  async expectPaymentSuccessful(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toHaveText("Payment was successful");
  }
}
