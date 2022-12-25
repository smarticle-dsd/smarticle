describe("Check if non-existent page redirects to 404 page", () => {
  it("passes", () => {
    cy.visit("/nanfw");
    cy.get("div").should("have.class", "sa-error404-page");
  });
});

describe("Check if clicking on error button redirects to home page", () => {
  it("passes", () => {
    cy.visit("/nanfw");
    cy.get("span").click().get(".upload-pdf-button");
  });
});
