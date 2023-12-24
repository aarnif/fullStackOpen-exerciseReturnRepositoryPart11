const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3003",
    env: {
      backend: "http://localhost:3003/api",
    },
    supportFile: "frontend/cypress/support/e2e.js",
    specPattern: "frontend/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
