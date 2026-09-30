import { test } from "../fixture";
import { App } from "../app/App";
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

async function addFirstProductToCart(
  app: App,
): Promise<{ name: string; price: number }> {
  await app.homePage.goto();
  return app.homePage.addFirstProductToCart();
}

async function verifyCartContents(
  app: App,
  product: { name: string; price: number },
): Promise<void> {
  await app.homePage.goToCart();
  await app.cartPage.expectItemMatches(product.name, product.price);
}

async function proceedToCheckoutAsAuthenticatedUser(app: App): Promise<void> {
  await app.cartPage.proceedToCheckout();
  // loggedInApp вже виконав логін до початку тесту, тому тут не має
  // з'явитись форма Sign in - користувача одразу пускає на крок адреси.
  await app.billingAddressPage.expectAlreadyAuthenticated();
}

async function submitBillingAddress(app: App): Promise<void> {
  await app.billingAddressPage.fillMissingFields(BILLING_ADDRESS);
  await app.billingAddressPage.proceedToCheckout();
}

async function payWithCreditCard(app: App): Promise<void> {
  await app.paymentPage.payWithCreditCard(CREDIT_CARD);
}

test.describe("Checkout (logged-in user)", { tag: "@regression" }, () => {
  test("Verify user can complete purchase with credit card", async ({
    loggedInApp: app,
  }) => {
    const product =
      await test.step("Add first product from homepage to cart", () =>
        addFirstProductToCart(app));

    await test.step("Verify cart contents", () =>
      verifyCartContents(app, product));

    await test.step("Proceed to checkout", () =>
      proceedToCheckoutAsAuthenticatedUser(app));

    await test.step("Fill missing billing address fields", () =>
      submitBillingAddress(app));

    await test.step("Pay with credit card", () => payWithCreditCard(app));

    await test.step("Verify payment was successful", () =>
      app.confirmationPage.expectPaymentSuccessful());
  });
});
