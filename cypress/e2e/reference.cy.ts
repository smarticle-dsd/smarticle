const pdfUrl = "https://arxiv.org/pdf/2211.14227.pdf";

const getIframeFromUrl = (pdfUrl: string, waitTime: number = 15000) => {
  cy.visit("/", {
    onBeforeLoad: function (window) {
      window.localStorage.setItem("Visited", "visited");
    },
  });
  return cy
    .get(".upload-pdf-button")
    .click({ force: true })
    .get(".modal-link-section")
    .type(pdfUrl)
    .get(".modal-upload-button")
    .click({ force: true })
    .wait(waitTime)
    .get("iframe")
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
};

describe("The reference details component opens when clicking on the Reference button on the toolbar", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrl).find("#referenceDetailsToolbarButton").click();
  });
});

describe("Rerence view wapper is shown when no reference has been clicked", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrl).then(($iframeData) => {
      const referenceButton = $iframeData.find(
        "#referenceDetailsToolbarButton",
      );
      cy.wrap(referenceButton).click();
      cy.wrap($iframeData)
        .find(".sa-reference")
        .then(($reference) => {
          const refrenceWrapper = $reference.find(".reference-view-wrapper");
          expect(refrenceWrapper).to.exist; //Check if wrapper exists
          const refView = $reference.find(".reference-view");
          expect(refView).to.contain.text("Click on a reference to preview it");
          const referenceCanvas = $reference.find(".referenceview-canvas");
          expect(referenceCanvas).to.be.hidden; // Canvas should not be displayed until it's clicked
          const jumpToContentButton = $reference.find(
            ".reference-content-button",
          );
          expect(jumpToContentButton).to.be.hidden; //Button should not be visible if wrapper is there
          const jumpBackButton = $reference.find(".reference-back-button");
          expect(jumpBackButton).to.be.hidden;
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
        .then(() => {
          const referenceCanvas = $iframeData.find(".reference-canvas");
          const referenceToolCanvas = $iframeData.find(".referenceview-canvas");
          const refrenceWrapper = $iframeData.find(".reference-view-wrapper");
          expect(refrenceWrapper).to.not.exist; //Wrapper should not exist when a reference is clicked
          expect(referenceCanvas).to.exist; // Check if pop up exists
          expect(referenceToolCanvas).to.be.visible; // Check if reference is displayed in toolbar
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
//           const referenceCanvas = $iframeData.find(".reference-canvas");
//           expect(referenceCanvas).to.exist; // Check if pop up exists
//         });
//     });
//   });
// });
