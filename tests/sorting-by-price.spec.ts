import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

const cases = [
  {
    sortValue: "price,asc",
    label: "Price (Low - High)",
    direction: "ascending" as const,
  },
  {
    sortValue: "price,desc",
    label: "Price (High - Low)",
    direction: "descending" as const,
  },
];

test.describe("Sorting by price", () => {
  for (const { sortValue, label, direction } of cases) {
    test(`Verify user can perform sorting by price: ${label}`, async ({
      page,
    }) => {
      const homePage = new HomePage(page);

      await homePage.goto();
      await homePage.sortBy(sortValue);

      const prices = await homePage.getProductPrices();
      const sortedPrices = [...prices].sort((a, b) =>
        direction === "ascending" ? a - b : b - a,
      );

      expect(prices).toEqual(sortedPrices);
    });
  }
});
