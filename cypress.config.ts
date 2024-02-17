import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,

  e2e: {
    baseUrl: 'https://beskydsketury.cz',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
