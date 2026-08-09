import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  test("Verify login with valid credentials", async ({ page }) => {
    // Step 1: Open URL
    await page.goto("https://practicesoftwaretesting.com/auth/login");

    // Step 2: Fill in credentials
    await page.locator("#email").fill("tatowof536@apdtax.com");
    await page.locator("#password").fill("Tatowof536!");

    // Step 3: Click Login
    await page.getByRole("button", { name: "Login" }).click();

    // Assertions
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");
    //await expect(page).toHaveTitle("Overview - Practice Software Testing - Toolshop - v5.0",);
    await expect(
      page.getByRole("heading", { name: "My account" }),
    ).toBeVisible();
    await expect(page.getByText("QA QA")).toBeVisible();
  });
});
