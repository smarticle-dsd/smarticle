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

// describe("Rerence view wapper is shown when no reference has been clicked", () => {
//   it("passes", () => {
//     getIframeFromUrl(pdfUrl).get(".sa-reference").should("exist");
//   });
// });
