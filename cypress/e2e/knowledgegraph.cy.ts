const pdfUrlWithSummaryAbstract = "https://arxiv.org/pdf/2211.14227.pdf";
const pdfUrlWithoutSummary = "https://arxiv.org/pdf/1305.3823.pdf";
const pdfUrlWithShortSummary = "https://arxiv.org/pdf/2211.14309.pdf";
const pdfUrlWithNoDetails = "https://arxiv.org/pdf/2211.14250.pdf";
const paperIdWithSummaryAbstract = "649def34f8be52c8b66281af98ae884c09aef38b";
const paperIdWithoutSummary = "arxiv:1305.3823";
const pdfFile = "cypress/fixtures/test1.pdf";
const getIframeFromUrl = (pdfUrl: string, waitTime: number = 15000) => {
  cy.visit("/", {
    onBeforeLoad: function (window) {
      window.localStorage.setItem("Visited", "visited");
    },
  });
  return cy
    .get(".upload-pdf-button")
    .click()
    .get(".modal-link-section")
    .type(pdfUrl)
    .get(".modal-upload-button")
    .click()
    .wait(waitTime)
    .get("iframe")
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
};

describe("The knowledge graph component opens when clicking on the Summary button on the toolbar", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract)
      .find("#knowledgeGraphToolbarButton")
      .click();
  });
});

describe("The paper details are displayed when Semantic Scholar has details for provided paper", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract).then(($iframeData) => {
      const knowledgeGraphButton = $iframeData.find(
        "#knowledgeGraphToolbarButton",
      );
      cy.wrap(knowledgeGraphButton).click();
      cy.wrap($iframeData)
        .find(".sa-knowledge-graph-details")
        .then(($details) => {
          expect($details.text()).to.contain(
            "Paper Title: Bypass Exponential Time Preprocessing: Fast Neural Network Training via Weight-Data Correlation Preprocessing",
          );
        });
    });
  });
});

describe("Error message is displayed when Semantic Scholar does not have details for provided paper", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithNoDetails).then(($iframeData) => {
      const knowledgeGraphButton = $iframeData.find(
        "#knowledgeGraphToolbarButton",
      );
      cy.wrap(knowledgeGraphButton).click();
      cy.wrap($iframeData)
        .find(".sa-sidebar-error")
        .then(($error) => {
          expect($error).to.exist;
          expect($error.text()).to.contain("Paper ID not found!");
          expect($error.text()).to.contain(
            "Supported ID formats and examples:",
          );
        });
    });
  });
});

describe('"Submit ID" and "Reset" buttons are disabled when paper is loaded without any user input', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithNoDetails).then(($iframeData) => {
      const knowledgeGraphButton = $iframeData.find(
        "#knowledgeGraphToolbarButton",
      );
      cy.wrap(knowledgeGraphButton).click();
      cy.wrap($iframeData)
        .find(".sa-sidebar-error")
        .then(($error) => {
          const submitButton = $error.find(".sidebar-submit-button");
          expect(submitButton[0]).to.be.disabled;
          const resetButton = $error.find(".sidebar-reset-button");
          expect(resetButton[0]).to.be.disabled;
        });
    });
  });
});

describe('"Submit ID" button is enabled when user starts typing input in the input field', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithNoDetails).then(($iframeData) => {
      const knowledgeGraphButton = $iframeData.find(
        "#knowledgeGraphToolbarButton",
      );
      cy.wrap(knowledgeGraphButton).click();
      cy.wrap($iframeData)
        .find(".sa-sidebar-error")
        .then(($error) => {
          const inputText = $error.find(".sidebar-error-input-text");
          const submitButton = $error.find(".sidebar-submit-button");
          expect(submitButton[0]).to.be.disabled;
          const resetButton = $error.find(".sidebar-reset-button");
          expect(resetButton[0]).to.be.disabled;
          cy.wrap(inputText[0])
            .type("abcd")
            .then(() => {
              expect(submitButton[0]).to.not.be.disabled;
              expect(resetButton[0]).to.be.disabled;
            });
        });
    });
  });
});

describe('"Reset" button is enabled when user has generated details for custom paper ID', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract).then(($iframeData) => {
      const knowledgeGraphButton = $iframeData.find(
        "#knowledgeGraphToolbarButton",
      );
      cy.wrap(knowledgeGraphButton).click();
      cy.wrap($iframeData)
        .find(".sa-sidebar-error")
        .then(($summary) => {
          const inputText = $summary.find(".sidebar-error-input-text");
          const submitButton = $summary.find(".sidebar-submit-button");
          expect(submitButton[0]).to.be.disabled;
          const resetButton = $summary.find(".sidebar-reset-button");
          expect(resetButton[0]).to.be.disabled;

          cy.wrap(inputText[0])
            .type(paperIdWithSummaryAbstract)
            .then(() => {
              expect(submitButton[0]).to.not.be.disabled;
              expect(resetButton[0]).to.be.disabled;
              cy.wrap(submitButton[0])
                .click()
                .wait(5000)
                .then(() => {
                  expect(resetButton[0]).to.not.be.disabled;
                });
            });
        });
    });
  });
});

describe('Clicking on "Reset" button resets the paper details to the originally generated details', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract).then(($iframeData) => {
      const knowledgeGraphButton = $iframeData.find(
        "#knowledgeGraphToolbarButton",
      );
      cy.wrap(knowledgeGraphButton).click();
      cy.wrap($iframeData)
        .find(".sa-knowledge-graph-wrapper")
        .then(($kg) => {
          let details = $kg.find(".sa-knowledge-graph-details");
          expect(details.text()).to.contain(
            "Paper Title: Bypass Exponential Time Preprocessing: Fast Neural Network Training via Weight-Data Correlation Preprocessing",
          );
          const sidebar = $kg.find(".sa-sidebar-error");
          const inputText = sidebar.find(".sidebar-error-input-text");
          console.log(inputText);
          const submitButton = sidebar.find(".sidebar-submit-button");
          expect(submitButton).to.be.disabled;
          const resetButton = sidebar.find(".sidebar-reset-button");
          expect(resetButton).to.be.disabled;

          cy.wrap(inputText)
            .type(pdfUrlWithoutSummary)
            .then(() => {
              expect(submitButton).to.not.be.disabled;
              expect(resetButton).to.be.disabled;
              cy.wrap(submitButton)
                .click()
                .wait(5000)
                .then(() => {
                  details = $kg.find(".sa-knowledge-graph-details");
                  expect(details.text()).to.not.contain(
                    "Paper Title: Bypass Exponential Time Preprocessing: Fast Neural Network Training via Weight-Data Correlation Preprocessing",
                  );
                  cy.wrap(resetButton)
                    .click()
                    .wait(5000)
                    .then(() => {
                      details = $kg.find(".sa-knowledge-graph-details");
                      expect(details.text()).to.contain(
                        "Paper Title: Bypass Exponential Time Preprocessing: Fast Neural Network Training via Weight-Data Correlation Preprocessing",
                      );
                    });
                });
            });
        });
    });
  });
});

describe('Entering a paper ID with details on Semantic Scholar and clicking on "Submit ID" displays the available details', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract).then(($iframeData) => {
      const knowledgeGraphButton = $iframeData.find(
        "#knowledgeGraphToolbarButton",
      );
      cy.wrap(knowledgeGraphButton).click();
      cy.wrap($iframeData)
        .find(".sa-knowledge-graph-wrapper")
        .then(($kg) => {
          let details = $kg.find(".sa-knowledge-graph-details");
          expect(details.text()).to.contain(
            "Paper Title: Bypass Exponential Time Preprocessing: Fast Neural Network Training via Weight-Data Correlation Preprocessing",
          );
          const sidebar = $kg.find(".sa-sidebar-error");
          const inputText = sidebar.find(".sidebar-error-input-text");
          console.log(inputText);
          const submitButton = sidebar.find(".sidebar-submit-button");
          expect(submitButton).to.be.disabled;
          const resetButton = sidebar.find(".sidebar-reset-button");
          expect(resetButton).to.be.disabled;
          cy.wrap(inputText)
            .type(paperIdWithSummaryAbstract)
            .then(() => {
              expect(submitButton).to.not.be.disabled;
              expect(resetButton).to.be.disabled;
              cy.wrap(submitButton)
                .click()
                .wait(5000)
                .then(() => {
                  details = $kg.find(".sa-knowledge-graph-details");
                  expect(details.text()).to.contain(
                    "Paper Title: Construction of the Literature Graph in Semantic ScholarPaper ID: 649def34f8be52c8b66281af98ae884c09aef38b",
                  );
                });
            });
        });
    });
  });
});

describe('Entering an invalid paper ID and clicking on "Submit ID" displays error message', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract).then(($iframeData) => {
      const knowledgeGraphButton = $iframeData.find(
        "#knowledgeGraphToolbarButton",
      );
      cy.wrap(knowledgeGraphButton).click();
      cy.wrap($iframeData)
        .find(".sa-knowledge-graph-wrapper")
        .then(($kg) => {
          let details = $kg.find(".sa-knowledge-graph-details");
          expect(details.text()).to.contain(
            "Paper Title: Bypass Exponential Time Preprocessing: Fast Neural Network Training via Weight-Data Correlation Preprocessing",
          );
          const sidebar = $kg.find(".sa-sidebar-error");
          const inputText = sidebar.find(".sidebar-error-input-text");
          console.log(inputText);
          const submitButton = sidebar.find(".sidebar-submit-button");
          expect(submitButton).to.be.disabled;
          const resetButton = sidebar.find(".sidebar-reset-button");
          expect(resetButton).to.be.disabled;
          cy.wrap(inputText)
            .type("abcd")
            .then(() => {
              expect(submitButton).to.not.be.disabled;
              expect(resetButton).to.be.disabled;
              cy.wrap(submitButton)
                .click()
                .wait(5000)
                .then(() => {
                  const error = $kg.find(".sa-sidebar-error");
                  expect(error).to.exist;
                  expect(error.text()).to.contain("Paper ID not found!");
                  expect(error.text()).to.contain(
                    "Supported ID formats and examples:",
                  );
                });
            });
        });
    });
  });
});

describe('Knowledge Graph modal opens when "Open Knowledge Graph" button is clicked', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract).then(($iframeData) => {
      const knowledgeGraphButton = $iframeData.find(
        "#knowledgeGraphToolbarButton",
      );
      cy.wrap(knowledgeGraphButton).click();
      cy.wrap($iframeData)
        .find(".sa-knowledge-graph-wrapper")
        .then(($kg) => {
          const knowledgeGraphButton = $kg.find(".sa-knowledge-graph-button");
          expect(knowledgeGraphButton).to.be.enabled;
          cy.wrap(knowledgeGraphButton).click();
          cy.get("#knowledge-graph-modal").then((modal) => {
            expect(modal).to.be.visible;
            const graph = modal.find(".sa-knowledge-graph-modal-graph");
            const nodeDetails = modal.find(
              ".sa-knowledge-graph-modal-node-details",
            );
            expect(graph).to.exist;
            expect(nodeDetails).to.exist;
            expect(nodeDetails.text()).to.contain(
              "Paper Title: Bypass Exponential Time Preprocessing: Fast Neural Network Training via Weight-Data Correlation Preprocessing",
            );
          });
        });
    });
  });
});
