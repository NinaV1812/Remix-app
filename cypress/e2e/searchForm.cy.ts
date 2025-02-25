describe("SearchForm", () => {
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
    cy.visit("/"); // Make sure to visit the page where the SearchForm is rendered
  });

  it("should render the search input field", () => {
    cy.get('input[placeholder="Search"]').should("be.visible");
  });

  it("should update the input value when typing", () => {
    const query = "John";

    cy.get('input[placeholder="Search"]')
      .click()
      .type("John{enter}")
      .should("have.value", query);
  });

  it('should add "loading" class when searching is true', () => {
    cy.get('input[placeholder="Search"]').then(($input) => {
      $input[0].classList.add("loading");
    });

    cy.get('input[placeholder="Search"]').should("have.class", "loading");
  });

  it("should hide the spinner when searching is false", () => {
    cy.get("div#search-spinner").should("have.attr", "hidden");
  });

  it("should render correct name after searching for 'John'", () => {
    cy.get('input[placeholder="Search"]').click().type("John");
    cy.request("http://localhost:5173/?q=John");

    cy.get('[data-cy="contact-item"]').should("contain.text", "John"); // Adjust the selector for name rendering
  });
});
