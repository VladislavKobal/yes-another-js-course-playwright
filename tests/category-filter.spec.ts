import { test, expect } from "../fixture";
import { Category } from "../emun/category.enum";

test.describe("Category filter", () => {
  test("Verify user can filter products by category", async ({ app }) => {
    await app.homePage.goto();

    await app.homePage.expandCategoryGroup(Category.PowerTools);
    await app.homePage.filterByCategory("Sander");

    const names = await app.homePage.getProductNames();
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name).toContain("Sander");
    }
  });
});
