const pdfUrlWithSummaryAbstract = "https://arxiv.org/pdf/2211.13228.pdf";
const pdfUrlWithoutAbstract = "https://arxiv.org/pdf/2006.16630.pdf";
const pdfUrlWithNoDetails = "https://arxiv.org/pdf/2211.14250.pdf";
const pdfFile = "cypress/fixtures/test1.pdf";
const getIframeFromUrl = (pdfUrl) => {
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
//     getIframeFromUrl(pdfUrlWithSummaryAbstract).find("#summary").click();
//   });
// });

// describe("The summary and abstract are displayed when Semantic Scholar has summary and abstract for provided paper", () => {
//   it("passes", () => {
//     getIframeFromUrl(pdfUrlWithSummaryAbstract)
//       .find(".sa-summary")
//       .should(($summary) => {
//         const tldr = $summary.find(".sa-summary-tldr");
//         expect(tldr).to.contain.text("Summary");
//         expect(tldr).to.contain.text(
//           "A new perspective of self-supervised learning based on extending heat equation into high dimensional feature space is presented and an insightful hypothesis on the invariance within visual representation over different shapes and textures: the linear relationship between horizontal and vertical derivatives is provided.",
//         );
//         const abstract = $summary.find(".sa-summary-abstract");
//         expect(abstract).to.contain.text("Abstract");
//         expect(abstract).to.contain.text(
//           "This paper presents a new perspective of self-supervised learning based on extending heat equation into high dimensional feature space. In particular, we remove time depen-dence by steady-state condition, and extend the remaining 2D Laplacian from x – y isotropic to linear correlated.",
//         );
//       });
//   });
// });

// describe("The abstract is displayed when Semantic Scholar has summary but no abstract for provided paper", () => {
//   it("passes", () => {
//     getIframeFromUrl(pdfUrlWithoutAbstract)
//       .find(".sa-summary")
//       .should(($summary) => {
//         const tldr = $summary.find(".sa-summary-tldr");
//         expect(tldr).to.contain.text("Summary");
//         expect(tldr).to.contain.text(
//           "This book chapter shows how VC theory can be derived from a detailed electrodiffusive theory for ion concentration dynamics in the extracellular medium, and it shows what assumptions must be introduced to get the VC theory on the simplified form that is commonly used by neuroscientists.",
//         );
//         const abstract = $summary.find(".sa-summary-abstract");
//         expect(abstract).not.to.contain.text("Abstract");
//         expect(abstract).to.be.empty;
//       });
//   });
// });

// describe("The summary is displayed when Semantic Scholar has abstract but no summary for provided paper", () => {
//   it("passes", () => {
//     getIframeFromUrl(pdfUrlWithoutAbstract)
//       .find(".sa-summary")
//       .should(($summary) => {
//         const tldr = $summary.find(".sa-summary-tldr");
//         expect(tldr).to.contain.text("Summary");
//         expect(tldr).to.contain.text(
//           "This book chapter shows how VC theory can be derived from a detailed electrodiffusive theory for ion concentration dynamics in the extracellular medium, and it shows what assumptions must be introduced to get the VC theory on the simplified form that is commonly used by neuroscientists.",
//         );
//         const abstract = $summary.find(".sa-summary-abstract");
//         expect(abstract).not.to.contain.text("Abstract");
//         expect(abstract).to.be.empty;
//       });
//   });
// });

// describe("Error message is displayed when Semantic Scholar does not have summary and abstract for provided paper", () => {
//   it("passes", () => {
//     getIframeFromUrl(pdfUrlWithNoDetails)
//       .find(".sa-summary")
//       .should(($summary) => {
//         const tldr = $summary.find(".sa-summary-tldr");
//         expect(tldr).to.contain.text("Summary");
//         expect(tldr.text()).to.equal("Summary");
//         const abstract = $summary.find(".sa-summary-abstract");
//         expect(abstract).not.to.contain.text("Abstract");
//         expect(abstract).to.be.empty;
//         const error = $summary.find(".sa-summary-error");
//         expect(error).to.exist;
//         expect(error.text()).to.contain("Paper ID not found!");
//         expect(error.text()).to.contain("Supported ID formats and examples:");
//       });
//   });
// });

// describe('"Submit ID" and "Reset" buttons are disabled when paper is loaded without any user input', () => {
//   it("passes", () => {
//     getIframeFromUrl(pdfUrlWithNoDetails)
//       .find(".sa-summary")
//       .should(($summary) => {
//         const submitButton = $summary.find(".sidebar-submit-button");
//         expect(submitButton).to.be.disabled;
//         const resetButton = $summary.find(".sidebar-reset-button");
//         expect(resetButton).to.be.disabled;
//       });
//   });
// });

describe('"Submit ID" button is enabled when user starts typing input in the input field', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithNoDetails)
      .find(".sa-summary")
      .should(($summary) => {
        const inputText = $summary.find(".sidebar-error-input-text");
        inputText.type("abcd");
        const submitButton = $summary.find(".sidebar-submit-button");
        expect(submitButton).to.not.be.disabled;
        const resetButton = $summary.find(".sidebar-reset-button");
        expect(resetButton).to.be.disabled;
      });
  });
});

// describe('"Reset" button is enabled when user has generated summary for custom paper ID', () => {
//   it("passes", () => {
//     getIframeFromUrl("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('Clicking on "Reset" button resets the summary to the originally generated summary/error', () => {
//   it("passes", () => {
//     getIframeFromUrl("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('Entering a paper ID and clicking on "Submit ID" with abstract and summary displays both summary and abstract', () => {
//   it("passes", () => {
//     getIframeFromUrl("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('Entering a paper ID and clicking on "Submit ID" with only abstract displays only abstract', () => {
//   it("passes", () => {
//     getIframeFromUrl("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('Entering a paper ID and clicking on "Submit ID" with only summary displays only summary', () => {
//   it("passes", () => {
//     getIframeFromUrl("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });

// describe('Entering an invalid paper ID and clicking on "Submit ID" displays error message', () => {
//   it("passes", () => {
//     getIframeFromUrl("https://arxiv.org/pdf/2211.13228.pdf")
//       .find("#summary")
//       .click();
//   });
// });
