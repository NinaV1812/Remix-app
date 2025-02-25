describe("Contacts List with API", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display a list of contacts", () => {
    cy.get("[data-cy=contact-item]").should("have.length.greaterThan", 0);
  });
});
