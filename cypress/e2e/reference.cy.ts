const pdfUrl = "https://arxiv.org/pdf/2211.14227.pdf";

const getIframeFromUrl = (pdfUrl: string) => {
  cy.visit("/");
  return cy
    .get(".upload-pdf-button")
    .click()
    .get(".modal-link-section")
    .type(pdfUrl)
    .get(".modal-upload-button")
    .click()
    .wait(10000)
    .get("iframe")
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
};

describe("The reference details component opens when clicking on the Reference button on the toolbar", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrl).find("#referenceDetails").click();
  });
});

describe("Rerence view wapper is shown when no reference has been clicked", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrl).then(($iframeData) => {
      const referenceButton = $iframeData.find("#referenceDetails");
      cy.wrap(referenceButton).click();
      cy.wrap($iframeData)
        .find(".sa-reference")
        .then(($reference) => {
          const refrenceWrapper = $reference.find(".reference-view-wrapper");
          expect(refrenceWrapper).to.exist;
          const referenceCanvas = $reference.find(".referenceview-canvas");
          expect(referenceCanvas).to.be.hidden;
          const jumpToContentButton = $reference.find(".referenceview-button");
          expect(jumpToContentButton).to.be.hidden;
        });
    });
  });
});

describe("Clicking on a reference shows a pop-up and opens it in sidebar", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrl).then(($iframeData) => {
      const annotation = $iframeData.find(".internalLink");
      cy.wrap(annotation[1])
        .click()
        .then(($reference) => {
          const referenceToolCanvas = $reference.find(".referenceview-canvas");
          const refrenceWrapper = $reference.find(".reference-view-wrapper");
          expect(referenceToolCanvas).to.be.visible; // Check if reference is displayed in toolbar
          expect(refrenceWrapper).to.not.exist; // Check if the wrapper is removed
        });
    });
  });
});

// describe("Clicking on a reference shows a pop-up and opens it in sidebar", () => {
//   it("passes", () => {
//     getIframeFromUrl(pdfUrl).then(($iframeData) => {
//       const annotation = $iframeData.find(".internalLink");

//       cy.wrap(annotation[1])
//         .trigger("mouseover")
//         .then(() => {
//           const canvas = $iframeData.find(".reference-canvas");
//           expect(canvas).to.exist;
//           const referenceToolCanvas = $iframeData.find(".referenceview-canvas");

//           const refrenceWrapper = $iframeData.find(".reference-view-wrapper");
//           expect(referenceToolCanvas).to.be.visible; // Check if reference is displayed in toolbar
//           expect(refrenceWrapper).to.not.exist; // Check if the wrapper is removed
//         });
//     });
//   });
// });
