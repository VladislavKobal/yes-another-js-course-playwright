import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

// Playwright не має вбудованого test.each() (як у Jest) - офіційний спосіб
// параметризації - звичайний цикл навколо test(). Кожен елемент масиву
// породжує окремий, індивідуально названий тест ще на етапі збору тестів,
// тому в звіті буде два незалежні тести, а не один цикл.
const cases = [
  { sortValue: "name,asc", label: "Name (A - Z)", direction: "ascending" as const },
  { sortValue: "name,desc", label: "Name (Z - A)", direction: "descending" as const },
];

test.describe("Sorting by name", () => {
  for (const { sortValue, label, direction } of cases) {
    test(`Verify user can perform sorting by name: ${label}`, async ({
      page,
    }) => {
      const homePage = new HomePage(page);

      await homePage.goto();
      await homePage.sortBy(sortValue);

      const names = await homePage.getProductNames();
      const sortedNames = [...names].sort((a, b) =>
        direction === "ascending" ? a.localeCompare(b) : b.localeCompare(a),
      );

      expect(names).toEqual(sortedNames);
    });
  }
});