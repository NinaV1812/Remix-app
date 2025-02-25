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

  it("should navigate to the Add Contact page", () => {
    cy.get("form#create-new-contact").should("be.visible");
    cy.contains("button", "New").should("be.visible").click({ force: true });
    cy.url().should("match", /\/contacts\/[a-f0-9]{24}\/edit/);  
});

it("should display the new contact in the list", () => {
    cy.get('[data-cy="contact-item"]').should("have.length.greaterThan", 0);
    cy.get('[data-cy="contact-item"]').first().within(() => {
      cy.get('i').should("contain", "No Name"); 
    });
  });
});
  
