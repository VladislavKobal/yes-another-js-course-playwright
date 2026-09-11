import { test } from "../fixture";
import { STORAGE_STATE_PATH } from "../utils/constants";

test.describe("My account (logged-in user)", () => {
  test.use({ storageState: STORAGE_STATE_PATH });

  test("Account page loads for an already logged-in user", async ({ app }) => {
    await app.page.goto("/account");
    await app.accountPage.expectLoaded();
  });
});
