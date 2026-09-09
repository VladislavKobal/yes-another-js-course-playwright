import { Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { AccountPage } from "../pages/AccountPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { BillingAddressPage } from "../pages/BillingAdressPage";
import { PaymentPage } from "../pages/PaymentPage";
import { ConfirmationPage } from "../pages/ConfirmationPage";

export class App {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly loginPage: LoginPage;
  readonly accountPage: AccountPage;
  readonly productPage: ProductPage;
  readonly cartPage: CartPage;
  readonly billingAddressPage: BillingAddressPage;
  readonly paymentPage: PaymentPage;
  readonly confirmationPage: ConfirmationPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.accountPage = new AccountPage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.billingAddressPage = new BillingAddressPage(page);
    this.paymentPage = new PaymentPage(page);
    this.confirmationPage = new ConfirmationPage(page);
  }
}
