/// <reference types="cypress" />
export {};

describe("main.cy.js", () => {
  it("should add new user, update it and remove it", () => {
    cy.visit("/");

    cy.url().should("include", "/home");

    cy.clickDataCy("add-user");

    cy.url().should("include", "/add");

    cy.fixture("user").then((user) => {
      cy.get("[data-cy=name]").type(user.name);

      cy.get("[data-cy=username]").type(user.username);

      cy.get("[data-cy=email]").type(user.email);

      cy.get("[data-cy=city]").type(user.city);

      cy.get("[data-cy=submit]").click();

      cy.url().should("include", "/home");

      cy.get("[data-cy=users]").should("contain", user.name);

      cy.contains("tr", user.name).within(() => {
        cy.get("[data-cy=id-cell]").then(($el) => {
          cy.clickDataCy("edit-user");
          cy.url().should("include", "/edit/" + $el.text());
        });
      });

      cy.get("[data-cy=name]").clear().type(user.updatedName);

      cy.get("[data-cy=submit]").click();

      cy.url().should("include", "/home");

      cy.get("[data-cy=users]").should("contain", user.updatedName);

      cy.contains("tr", user.name).within(() => {
        cy.clickDataCy("delete-user");
      });

      cy.get("[data-cy=delete-dialog]").should("be.visible");

      cy.clickDataCy("delete-button");

      cy.get("[data-cy=users]").should("not.contain", user.name);
    });
  });
});
