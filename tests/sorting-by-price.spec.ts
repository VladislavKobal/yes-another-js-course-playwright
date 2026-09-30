import { test, expect } from "../fixture";

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

test.describe("Sorting by price", { tag: "@regression" }, () => {
  for (const { sortValue, label, direction } of cases) {
    test(`Verify user can perform sorting by price: ${label}`, async ({
      app,
    }) => {
      await app.homePage.goto();
      await app.homePage.sortBy(sortValue);

      const prices = await app.homePage.getProductPrices();
      const sortedPrices = [...prices].sort((a, b) =>
        direction === "ascending" ? a - b : b - a,
      );

      expect(prices).toEqual(sortedPrices);
    });
  }
});
