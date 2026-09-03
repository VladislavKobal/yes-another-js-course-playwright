import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { Category } from "../emun/category.enum";

test.describe("Category filter", () => {
  test("Verify user can filter products by category", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.expandCategoryGroup(Category.PowerTools);
    await homePage.filterByCategory("Sander");

    const names = await homePage.getProductNames();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name).toContain("Sander");
    }
  });
});
