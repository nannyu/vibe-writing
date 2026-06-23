import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  use: {
    baseURL: "http://localhost:4567",
    headless: true,
    screenshot: "only-on-failure",
  },
  // Reuse already-running dev server; start one if none is running.
  // INKOS_PROJECT_ROOT points to test-project/ which has an inkos.json,
  // so the API /api/v1/project endpoint returns valid JSON and the React
  // app can reach the ready state.
  webServer: {
    command: "INKOS_STUDIO_PORT=4569 INKOS_PROJECT_ROOT=../../test-project tsx watch --clear-screen=false src/api/index.ts & vite --host --port 4567 ; kill %1 2>/dev/null",
    url: "http://localhost:4567",
    reuseExistingServer: true,
    timeout: 120_000,
    cwd: ".",
  },
});
