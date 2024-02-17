import "./commands";
import "cypress-plugin-steps";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
