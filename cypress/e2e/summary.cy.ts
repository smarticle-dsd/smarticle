const getPDFViewerFromURL = (pdfUrl) => {
  cy.visit("/");
  return cy
    .get(".upload-pdf-button")
    .click()
    .get(".modal-link-section")
    .type(pdfUrl)
    .get(".modal-upload-button")
    .click()
    .wait(2000)
    .get("iframe")
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
};

// describe("The summary component opens when clicking on the Summary button on the toolbar", () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

describe("The summary and abstract are displayed when Semantic Scholar has summary and abstract for provided paper", () => {
  it("passes", () => {
    getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf").find(
      ".sa-summary",
    );
  });
});

// describe("The abstract is displayed when Semantic Scholar has abstract but no summary for provided paper", () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find(".sa-summary")
//       .click();
//   });
// });

// describe("The summary is displayed when Semantic Scholar has summary but no abstract for provided paper", () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe("Error message is displayed when Semantic Scholar does not have summary and abstract for provided paper", () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('"Submit ID" and "Reset" buttons are disabled when paper is loaded without any user input', () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('"Submit ID" button is enabled when user starts typing input in the input field', () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('"Reset" button is enabled when user has generated summary for custom paper ID', () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('Clicking on "Reset" button resets the summary to the originally generated summary/error', () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('Entering a paper ID and clicking on "Submit ID" with abstract and summary displays both summary and abstract', () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('Entering a paper ID and clicking on "Submit ID" with only abstract displays only abstract', () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('Entering a paper ID and clicking on "Submit ID" with only summary displays only summary', () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('Entering an invalid paper ID and clicking on "Submit ID" displays error message', () => {
//   it("passes", () => {
//     getPDFViewerFromURL("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });
