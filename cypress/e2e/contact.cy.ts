import { Favorite } from "../../app/routes/contacts.$contactId"; // Adjust path accordingly

describe("Create Empty Contact", () => {
  // spin up test mdb
  it("should create an empty contact", () => {
    Cypress.on("uncaught:exception", (err) => {
      if (
        /hydrat/i.test(err.message) ||
        /Minified React error #418/.test(err.message) ||
        /Minified React error #423/.test(err.message)
      ) {
        return false; // Prevent Cypress from failing the test
      }
    });

    cy.intercept("POST", "/?_data=root", {
      body: { _id: "12345" }, // Mock response with a contact ID
    }).as("createContact"); // Alias the request to `@createContact`

    cy.visit("/");
    cy.get("form#create-new-contact").should("be.visible");
    cy.contains("button", "New").click();

    cy.wait("@createContact").then((interception) => {
      cy.log("Intercepted response:", interception?.response?.body);
      // const newId = interception.response.body._id;
      // cy.url().should("match", `http://localhost:5173/contacts/${newId}/edit`);
    });
    // cy.url().should("match", /\/contacts\/[a-f0-9]{24}\/edit$/);
  });
});

describe("Get contacts", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should return a 404 if the contact is not found", () => {
    cy.visit("/contacts/1234", {
      failOnStatusCode: false, 
    });

    cy.title().should("eq", "Unhandled Thrown Response!");
    cy.contains("404").should("be.visible");
  })

  it("should change name on edit contact", () => {
    cy.visit("/contacts/67ba7c301ae599ae3239fd53/edit", {
      failOnStatusCode: false, 
    });
    cy.get('input[aria-label="First name"]').type("New Name");
    cy.get('input[aria-label="Last name"]').type("New Last Name");

    cy.get('input[aria-label="First name"').should("have.value", "New Name");
    cy.get('input[aria-label="Last name"]').should(
      "have.value",
      "New Last Name"
    );

    // cy.get("form#contact-form").submit();
    // cy.get("h1").should("contain.text", "New Name New Last Name");
  });
});
