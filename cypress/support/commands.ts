export {};
/// <reference types="cypress" />

Cypress.Commands.add("clickDataCy", (dataCy: string) => {
  cy.get(`[data-cy=${dataCy}]`).click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      clickDataCy(dataCy: string): Chainable<void>;
    }
  }
}
