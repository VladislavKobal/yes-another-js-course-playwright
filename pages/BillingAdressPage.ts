import { Page, Locator, expect } from "@playwright/test";

export interface BillingAddressData {
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
}

export class BillingAddressPage {
  readonly page: Page;
  readonly countrySelect: Locator;
  readonly postalCodeInput: Locator;
  readonly houseNumberInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly proceedButton: Locator;
  readonly billingAddressHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.countrySelect = page.getByTestId("country");
    this.postalCodeInput = page.getByPlaceholder("Your Postcode *");
    this.houseNumberInput = page.getByPlaceholder("e.g. 42 *");
    this.streetInput = page.getByTestId("street");
    this.cityInput = page.getByTestId("city");
    this.stateInput = page.getByPlaceholder("State *");
    this.proceedButton = page.getByRole("button", {
      name: "Proceed to checkout",
    });

    this.billingAddressHeading = page.getByRole("heading", {
      name: "Billing Address",
    });
  }

  async expectAlreadyAuthenticated(): Promise<void> {
    await expect(this.billingAddressHeading).toBeVisible();
    await expect(
      this.page.getByRole("heading", { name: "Sign in" }),
    ).toHaveCount(0);
  }

  private async fillIfEmpty(locator: Locator, value: string): Promise<void> {
    const currentValue = await locator.inputValue();
    if (!currentValue) {
      await locator.fill(value);
    }
  }

  async fillMissingFields(data: BillingAddressData): Promise<void> {
    const selectedCountry = await this.countrySelect.inputValue();
    if (!selectedCountry) {
      await this.countrySelect.selectOption({ label: data.country });
    }

    await this.fillIfEmpty(this.postalCodeInput, data.postalCode);
    await this.fillIfEmpty(this.houseNumberInput, data.houseNumber);
    await this.fillIfEmpty(this.streetInput, data.street);
    await this.fillIfEmpty(this.cityInput, data.city);
    await this.fillIfEmpty(this.stateInput, data.state);
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedButton.click();
  }
}
