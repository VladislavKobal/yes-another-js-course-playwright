import { test } from "../fixture";
import { STORAGE_STATE_PATH } from "../utils/constants";
import { requireEnv } from "../utils/env";

test.describe("My account (logged-in user)", { tag: "@smoke" }, () => {
  test("Account page loads for an already logged-in user", async ({
    loggedInApp: app,
  }) => {
    await app.page.goto("/account");
    await app.accountPage.expectLoaded(requireEnv("USER_NAME"));
  });

  test.describe("(legacy) via UI storageState", () => {
    test.use({ storageState: STORAGE_STATE_PATH });

    test.skip("Account page loads for an already logged-in user (storageState)", async ({
      app,
    }) => {
      await app.page.goto("/account");
      await app.accountPage.expectLoaded(requireEnv("USER_NAME"));
    });
  });
});
