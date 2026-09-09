import { test, expect } from "../fixture";

const cases = [
  {
    sortValue: "name,asc",
    label: "Name (A - Z)",
    direction: "ascending" as const,
  },
  {
    sortValue: "name,desc",
    label: "Name (Z - A)",
    direction: "descending" as const,
  },
];

test.describe("Sorting by name", () => {
  for (const { sortValue, label, direction } of cases) {
    test(`Verify user can perform sorting by name: ${label}`, async ({
      app,
    }) => {
      await app.homePage.goto();
      await app.homePage.sortBy(sortValue);

      const names = await app.homePage.getProductNames();
      const sortedNames = [...names].sort((a, b) =>
        direction === "ascending" ? a.localeCompare(b) : b.localeCompare(a),
      );

      expect(names).toEqual(sortedNames);
    });
  }
});
