describe("home page", () => {
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

  it("the h1 contains the correct text", () => {
    cy.getByData("remix-index-page")
      .should("exist")
      .contains(/This is a demo for Remix./i);

    cy.getByData("remix-contacts-heading")
      .should("exist")
      .contains("Remix Contacts");
  });
  it("should display a list of contacts", () => {
    cy.getByData("contact-item").should("have.length.greaterThan", 0);
  });
});
