describe("Check if about page has section title for product info", () => {
  it("passes", () => {
    cy.visit("/about");
    cy.get(".about-title").should("contain", "The product");
  });
});

describe("Check if about page has section title for SCORE info", () => {
  it("passes", () => {
    cy.visit("/about");
    cy.get(".about-title").should("contain", "ICSE SCORE 2023");
  });
});

describe("Check if about page has section title for customer info", () => {
  it("passes", () => {
    cy.visit("/about");
    cy.get(".about-title").should("contain", "The customers");
  });
});

describe("Check if about page has section title for team info", () => {
  it("passes", () => {
    cy.visit("/about");
    cy.get(".about-title").should("contain", "The team");
  });
});

describe("Check if about page has section title for supervisor info", () => {
  it("passes", () => {
    cy.visit("/about");
    cy.get(".about-title").should("contain", "The supervisors");
  });
});

describe("Check if about 5 description elements", () => {
  it("passes", () => {
    cy.visit("/about");
    cy.get("div").find(".about-description").should("have.length", 5);
  });
});
