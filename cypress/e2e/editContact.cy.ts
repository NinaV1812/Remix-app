describe("Create an empty contact", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err) => {
      if (
        /hydrat/i.test(err.message) ||
        /Minified React error #418/.test(err.message) ||
        /Minified React error #423/.test(err.message)
      ) {
        return false; // Prevent Cypress from failing the test
      }
    });
    cy.visit("/");
  });

  it("navigate to edit and edit contact", () => {
    cy.getByData("contact-item").first().click();
    cy.location("pathname").should("match", /^\/contacts\/.*/);
    cy.getByData("edit-contact").should("exist").submit();
    cy.location("pathname").should("match", /^\/contacts\/.*\/edit$/);

    cy.getByData("input-first")
      .then(($input) => {
        if ($input.val()) {
          cy.getByData("input-first").clear();
        }
      })
      .type("Updated First Name");

    cy.getByData("input-last")
      .then(($input) => {
        if ($input.val()) {
          cy.getByData("input-last").clear();
        }
      })
      .type("Updated Last Name");
    cy.getByData("save-edit-contact-button").should("exist").click();
    cy.location("pathname").should("match", /^\/contacts\/.*/);

    cy.getByData("contact-item").should("contain", "Updated First Name");
    cy.getByData("contact-item").should("contain", "Updated Last Name");
  });
});

// it("should display the new contact in the list", () => {
//   // cy.get('[data-cy="contact-item"]').should("have.length.greaterThan", 0); // Ensures at least one contact is shown
//   cy.get('[data-cy="contact-item"]').first().click();
//   cy.contains("button", "Edit", { timeout: 5000 }).click({ force: true });
//   cy.get('input[name="first"]').then(($input) => {
//     if ($input.val()) {
//       cy.wrap($input).clear();
//     }
//     cy.wrap($input).type("Updated First Name");
//   });

//   cy.get('input[name="last"]').then(($input) => {
//     if ($input.val()) {
//       cy.wrap($input).clear();
//     }
//     cy.wrap($input).type("Updated Last Name");
//   });
//   cy.contains("button", "Save").click();

//   cy.get('[data-cy="contact-item"]').should("contain", "Updated First Name");
//   cy.get('[data-cy="contact-item"]').should("contain", "Updated Last Name");
// });
