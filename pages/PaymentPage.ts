import { Page, Locator } from "@playwright/test";

export interface CreditCardDetails {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardHolderName: string;
}

export class PaymentPage {
  readonly page: Page;
  readonly paymentMethodSelect: Locator;
  readonly cardNumberInput: Locator;
  readonly expirationDateInput: Locator;
  readonly cvvInput: Locator;
  readonly cardHolderNameInput: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.paymentMethodSelect = page.getByTestId("payment-method");
    this.cardNumberInput = page.getByPlaceholder("Credit Card Number");
    this.expirationDateInput = page.getByPlaceholder("Expiration Date");
    this.cvvInput = page.getByPlaceholder("CVV");
    this.cardHolderNameInput = page.getByPlaceholder("Card Holder Name");

    this.confirmButton = page.getByRole("button", { name: "Confirm" });
  }

  async payWithCreditCard(details: CreditCardDetails): Promise<void> {
    await this.paymentMethodSelect.selectOption({ value: "credit-card" });
    await this.cardNumberInput.fill(details.cardNumber);
    await this.expirationDateInput.fill(details.expirationDate);
    await this.cvvInput.fill(details.cvv);
    await this.cardHolderNameInput.fill(details.cardHolderName);
    await this.confirmButton.click();
  }
}
export function getFutureExpirationDate(monthsAhead: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsAhead);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${month}/${year}`;
}
