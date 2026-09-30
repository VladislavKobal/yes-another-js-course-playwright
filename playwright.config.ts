import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    testIdAttribute: "data-test",
  },

  projects: [
    {
      name: "auth",
      testMatch: /auth\.login\.spec\.ts/,
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["auth"],
      testIgnore: /auth\.login\.spec\.ts/,
    },
    {
      name: "smoke",
      use: { ...devices["Desktop Chrome"] },
      grep: /@smoke/,
    },
    {
      name: "regression",
      use: { ...devices["Desktop Chrome"] },
      grep: /@regression/,
    },
  ],
});
