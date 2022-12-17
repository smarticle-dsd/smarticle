describe("Check if home page has upload button", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get("button").should("have.class", "upload-pdf-button");
  });
});

describe("Check if homepage has all 4 product descriptions", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get("div").find(".home-page-description").should("have.length", 4);
  });
});

describe("Check if homepage has all 4 product description icons", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get("div").find(".home-page-icon").should("have.length", 4);
  });
});

describe("Clicking on upload button opens upload modal", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get("button").should("have.class", "upload-pdf-button");
    cy.get(".upload-pdf-button").click().get(".sa-upload-modal");
  });
});
