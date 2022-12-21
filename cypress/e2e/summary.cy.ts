const pdfUrlWithSummaryAbstract = "https://arxiv.org/pdf/2211.14227.pdf";
const pdfUrlWithoutSummary = "https://arxiv.org/pdf/1305.3823.pdf";
const pdfUrlWithNoDetails = "https://arxiv.org/pdf/2211.14250.pdf";
const paperIdWithSummaryAbstract = "649def34f8be52c8b66281af98ae884c09aef38b";
const paperIdWithoutSummary = "arxiv:1305.3823";
const pdfFile = "cypress/fixtures/test1.pdf";
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

describe("The summary component opens when clicking on the Summary button on the toolbar", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract).find("#summary").click();
  });
});

describe("The summary and abstract are displayed when Semantic Scholar has summary and abstract for provided paper", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract)
      .find(".sa-summary")
      .then(($summary) => {
        const tldr = $summary.find(".sa-summary-tldr");
        expect(tldr).to.contain.text("Summary");
        expect(tldr).to.contain.text(
          "A new preprocessing method is presented that simply stores the weight-data correlation in a tree data structure in order to quickly, dynamically detect which neurons are detected at each iteration, and it is proved that assuming a popular conjecture from complexity theory, one could not substantially speed up the algorithm for dynamic detection ofring neurons.",
        );
        const abstract = $summary.find(".sa-summary-abstract");
        expect(abstract).to.contain.text("Abstract");
        expect(abstract).to.contain.text(
          "Over the last decade, deep neural networks have transformed our society, and they are already widely applied in various machine learning applications",
        );
      });
  });
});

describe("The available data is displayed when Semantic Scholar has either summary or abstract for provided paper", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithoutSummary)
      .find(".sa-summary")
      .then(($summary) => {
        const tldr = $summary.find(".sa-summary-tldr");
        expect(tldr.text()).to.equal("Summary");
        const abstract = $summary.find(".sa-summary-abstract");
        expect(abstract).to.contain.text("Abstract");
        expect(abstract).to.contain.text(
          "In this paper we study the azimuthal correlations of heavy quarks in Pb+Pb collisions with",
        );
      });
  });
});

describe("Error message is displayed when Semantic Scholar does not have summary and abstract for provided paper", () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithNoDetails)
      .find(".sa-summary")
      .then(($summary) => {
        const tldr = $summary.find(".sa-summary-tldr");
        expect(tldr).to.contain.text("Summary");
        expect(tldr.text()).to.equal("Summary");
        const abstract = $summary.find(".sa-summary-abstract");
        expect(abstract).to.be.empty;
        const error = $summary.find(".sa-summary-error");
        expect(error).to.exist;
        expect(error.text()).to.contain("Paper ID not found!");
        expect(error.text()).to.contain("Supported ID formats and examples:");
      });
  });
});

describe('"Submit ID" and "Reset" buttons are disabled when paper is loaded without any user input', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithNoDetails)
      .find(".sa-summary")
      .then(($summary) => {
        const submitButton = $summary.find(".sidebar-submit-button");
        expect(submitButton).to.be.disabled;
        const resetButton = $summary.find(".sidebar-reset-button");
        expect(resetButton).to.be.disabled;
      });
  });
});

describe('"Submit ID" button is enabled when user starts typing input in the input field', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithNoDetails)
      .find(".sa-summary")
      .then(($summary) => {
        const inputText = $summary.find(".sidebar-error-input-text");
        const submitButton = $summary.find(".sidebar-submit-button");
        expect(submitButton).to.be.disabled;
        const resetButton = $summary.find(".sidebar-reset-button");
        expect(resetButton).to.be.disabled;
        cy.wrap(inputText)
          .type("abcd", { force: true })
          .then(() => {
            expect(submitButton).to.not.be.disabled;
            expect(resetButton).to.be.disabled;
          });
      });
  });
});

describe('"Reset" button is enabled when user has generated summary for custom paper ID', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract)
      .find(".sa-summary")
      .then(($summary) => {
        const inputText = $summary.find(".sidebar-error-input-text");
        const submitButton = $summary.find(".sidebar-submit-button");
        expect(submitButton).to.be.disabled;
        const resetButton = $summary.find(".sidebar-reset-button");
        expect(resetButton).to.be.disabled;

        cy.wrap(inputText)
          .type(paperIdWithSummaryAbstract, { force: true })
          .then(() => {
            expect(submitButton).to.not.be.disabled;
            expect(resetButton).to.be.disabled;
            cy.wrap(submitButton)
              .click({ force: true })
              .wait(5000)
              .then(() => {
                expect(resetButton).to.not.be.disabled;
              });
          });
      });
  });
});

describe('Clicking on "Reset" button resets the summary to the originally generated summary/error', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract)
      .find(".sa-summary")
      .then(($summary) => {
        const inputText = $summary.find(".sidebar-error-input-text");
        const submitButton = $summary.find(".sidebar-submit-button");
        expect(submitButton).to.be.disabled;
        const resetButton = $summary.find(".sidebar-reset-button");
        expect(resetButton).to.be.disabled;
        const tldr = $summary.find(".sa-summary-tldr");
        const abstract = $summary.find(".sa-summary-abstract");

        cy.wrap(inputText)
          .type(paperIdWithSummaryAbstract, { force: true })
          .then(() => {
            expect(submitButton).to.not.be.disabled;
            expect(resetButton).to.be.disabled;
            cy.wrap(submitButton)
              .click({ force: true })
              .wait(5000)
              .then(() => {
                cy.wrap(resetButton)
                  .click({ force: true })
                  .wait(5000)
                  .then(() => {
                    expect(tldr).to.contain.text(
                      "A new preprocessing method is presented that simply stores the weight-data correlation in a tree data structure in order to quickly, dynamically detect which neurons are detected at each iteration, and it is proved that assuming a popular conjecture from complexity theory, one could not substantially speed up the algorithm for dynamic detection ofring neurons.",
                    );
                    expect(abstract).to.contain.text(
                      "Over the last decade, deep neural networks have transformed our society, and they are already widely applied in various machine learning applications",
                    );
                  });
              });
          });
      });
  });
});

describe('Entering a paper ID with abstract and summary and clicking on "Submit ID" displays both summary and abstract', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithSummaryAbstract)
      .find(".sa-summary")
      .then(($summary) => {
        const inputText = $summary.find(".sidebar-error-input-text");
        const submitButton = $summary.find(".sidebar-submit-button");
        expect(submitButton).to.be.disabled;
        const resetButton = $summary.find(".sidebar-reset-button");
        expect(resetButton).to.be.disabled;
        const tldr = $summary.find(".sa-summary-tldr");
        const abstract = $summary.find(".sa-summary-abstract");

        cy.wrap(inputText)
          .type(paperIdWithSummaryAbstract, { force: true })
          .then(() => {
            expect(submitButton).to.not.be.disabled;
            expect(resetButton).to.be.disabled;
            cy.wrap(submitButton)
              .click({ force: true })
              .wait(5000)
              .then(() => {
                expect(tldr).to.contain.text(
                  "This paper reduces literature graph construction into familiar NLP tasks, point out research challenges due to differences from standard formulations of these tasks, and report empirical results for each task.",
                );
                expect(abstract).to.contain.text(
                  "We describe a deployed scalable system for organizing published scientific literature into a heterogeneous graph to facilitate algorithmic manipulation and discovery.",
                );
              });
          });
      });
  });
});

describe('Entering a paper ID with either abstract or summary and clicking on "Submit ID" displays only available data', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithoutSummary)
      .find(".sa-summary")
      .then(($summary) => {
        const inputText = $summary.find(".sidebar-error-input-text");
        const submitButton = $summary.find(".sidebar-submit-button");
        expect(submitButton).to.be.disabled;
        const resetButton = $summary.find(".sidebar-reset-button");
        expect(resetButton).to.be.disabled;
        const tldr = $summary.find(".sa-summary-tldr");
        const abstract = $summary.find(".sa-summary-abstract");

        cy.wrap(inputText)
          .type(paperIdWithoutSummary, { force: true })
          .then(() => {
            expect(submitButton).to.not.be.disabled;
            expect(resetButton).to.be.disabled;
            cy.wrap(submitButton)
              .click({ force: true })
              .wait(5000)
              .then(() => {
                expect(abstract).to.contain.text(
                  "In this paper we study the azimuthal correlations of heavy quarks in Pb+Pb collisions with",
                );
                expect(tldr.text()).to.equal("Summary");
              });
          });
      });
  });
});

describe('Entering an invalid paper ID and clicking on "Submit ID" displays error message', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithNoDetails)
      .find(".sa-summary")
      .then(($summary) => {
        const inputText = $summary.find(".sidebar-error-input-text");
        const submitButton = $summary.find(".sidebar-submit-button");
        expect(submitButton).to.be.disabled;
        const resetButton = $summary.find(".sidebar-reset-button");
        expect(resetButton).to.be.disabled;
        const tldr = $summary.find(".sa-summary-tldr");
        const abstract = $summary.find(".sa-summary-abstract");
        const error = $summary.find(".sa-summary-error");

        cy.wrap(inputText)
          .type("abcd", { force: true })
          .then(() => {
            expect(submitButton).to.not.be.disabled;
            expect(resetButton).to.be.disabled;
            cy.wrap(submitButton)
              .click({ force: true })
              .wait(5000)
              .then(() => {
                expect(tldr.text()).to.equal("Summary");
                expect(abstract).to.be.empty;
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

describe('"Generate Summary" button is enabled when user opens the Summary tool', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithoutSummary)
      .find(".sa-summary")
      .then(($summary) => {
        const generateSummaryButton = $summary.find(
          ".sa-summary-custom-button",
        );
        expect(generateSummaryButton).to.be.enabled;
      });
  });
});

describe('When user clicks on "Generate Summary" button without any selection, an error message is displayed', () => {
  it("passes", () => {
    getIframeFromUrl(pdfUrlWithoutSummary)
      .find(".sa-summary")
      .then(($summary) => {
        const generateSummaryText = $summary.find(".sa-summary-custom-text");
        const generateSummaryButton = $summary.find(
          ".sa-summary-custom-button",
        );
        cy.wrap(generateSummaryButton)
          .click({ force: true })
          .then(() => {
            expect(generateSummaryText.text()).to.contain(
              "Please select a section of the text to view summary of the section.",
            );
          });
      });
  });
});
