// describe("Create Empty Contact", () => {
//     it("should create an empty contact and redirect to edit page", () => {
//       cy.intercept("POST", "/contacts", {
//         statusCode: 201,
//         body: { _id: "12345" }, // Mocked response
//       }).as("createContact");

//       cy.visit("/contacts"); // Visit the page where the form is located

//       cy.get("form").submit(); // Submit the form
//       cy.wait("@createContact").its("response.statusCode").should("eq", 201);

//       cy.url().should("include", "/contacts/12345/edit");
//     });
//   });
// describe("My First Test", () => {
//   it("Does not do much!", () => {
//     cy.visit("/blabla");
//     // expect(true).to.equal(true);
//   });
// });
