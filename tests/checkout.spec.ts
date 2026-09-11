
import { test } from "../fixture";
import { getFutureExpirationDate } from "../pages/PaymentPage";
import type { BillingAddressData } from "../pages/BillingAdressPage";
import type { CreditCardDetails } from "../pages/PaymentPage";

const BILLING_ADDRESS: BillingAddressData = {
  country: "Netherlands",
  postalCode: "1234AB",
  houseNumber: "42",
  street: "Test street 123",
  city: "Utrecht",
  state: "Test State",
};

const CREDIT_CARD: CreditCardDetails = {
  cardNumber: "1111-1111-1111-1111",
  expirationDate: getFutureExpirationDate(3),
  cvv: "111",
  cardHolderName: "Jane Tester",
};

test.describe("Checkout - authenticated user", () => {
  test("should complete purchase with credit card", async ({
    loggedInApp: app,
  }) => {
    // Arrange
    await test.step("Add first product to cart", async () => {
      await app.homePage.goto();
      await app.homePage.addFirstProductToCart();
    });

    // Cart
    await test.step("Open cart and confirm product", async () => {
      await app.homePage.goToCart();

      const product = await app.cartPage.getFirstProduct();

      await app.cartPage.expectItemMatches(
        product.name,
        product.price,
      );
    });

    // Checkout
    await test.step("Proceed to checkout", async () => {
      await app.cartPage.proceedToCheckout();
      await app.billingAddressPage.expectAlreadyAuthenticated();
    });

    // Billing address
    await test.step("Complete billing address", async () => {
      await app.billingAddressPage.fillMissingFields(BILLING_ADDRESS);
      await app.billingAddressPage.proceedToCheckout();
    });

    // Payment
    await test.step("Pay with credit card", async () => {
      await app.paymentPage.payWithCreditCard(CREDIT_CARD);
    });

    // Assert
    await test.step("Confirm successful payment", async () => {
      await app.confirmationPage.expectPaymentSuccessful();
    });
  });
});

