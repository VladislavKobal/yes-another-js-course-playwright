import { test, expect } from "../fixture";
import { mockProductsList } from "../mocks/Products.mock";

test.describe("Product list (mocked API)", () => {
  test("Verify 20 mocked products are displayed on the homepage", async ({
    app,
  }) => {
    const mockProducts = await mockProductsList(app.page, 20);

    await app.homePage.goto();

    await expect(app.homePage.productNames).toHaveCount(mockProducts.length);

    const names = await app.homePage.getProductNames();
    for (const [i, product] of mockProducts.entries()) {
      expect(names[i]).toBe(product.name);
    }
  });
});
