describe("Check if upload page has close button", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get(".sa-upload-modal")
      .get("div")
      .should("have.class", "title-and-close-button");
  });
});

describe("Check if upload page has drop area", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get("div")
      .should("have.class", "modal-drop-area")
      .get('input[type="file"]');
  });
});

describe("Check if upload page has a input field for link", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get("input")
      .should("have.class", "modal-link-section");
  });
});

// describe("Drag and drop of PDF file opens PDF Viewer", () => {
//   it("passes", () => {
//     const filePath = "cypress/fixtures/test1.pdf";
//     cy.readFile(filePath, null).then((file) => {
//       cy.visit("/");
//       cy.get(".upload-pdf-button")
//         .click()
//         .get('input[type="file"]')
//         .selectFile(
//           {
//             contents: file,
//             fileName: filePath.split("\\").pop()?.split("/").pop(),
//           },
//           {
//             action: "drag-drop",
//           },
//         )
//         .get(".sa-pdf-viewer-page");
//     });
//   });
// });

// describe("Clicking and uploading PDF file opens PDF Viewer", () => {
//   it("passes", () => {
//     const filePath = "cypress/fixtures/test1.pdf";
//     cy.readFile(filePath, null).then((file) => {
//       cy.visit("/");
//       cy.get(".upload-pdf-button")
//         .click()
//         .get('input[type="file"]')
//         .selectFile({
//           contents: file,
//           fileName: filePath.split("\\").pop()?.split("/").pop(),
//         })
//         .get(".sa-pdf-viewer-page");
//     });
//   });
// });

describe("Drag and drop of non-PDF file shows error message", () => {
  it("passes", () => {
    const filePath = "cypress/fixtures/example.json";
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get('input[type="file"]')
      .selectFile(filePath, {
        action: "drag-drop",
      })
      .get(".modal-error-message")
      .contains(
        "The uploaded file is not supported. Only pdf files are allowed.",
      );
  });
});

describe("Clicking and uploading non-PDF file shows error message", () => {
  it("passes", () => {
    const filePath = "cypress/fixtures/example.json";
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get('input[type="file"]')
      .selectFile(filePath)
      .get(".modal-error-message")
      .contains(
        "The uploaded file is not supported. Only pdf files are allowed.",
      );
  });
});

describe("Drag and drop of non-PDF file disables Continue button", () => {
  it("passes", () => {
    const filePath = "cypress/fixtures/example.json";
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get('input[type="file"]')
      .selectFile(filePath, {
        action: "drag-drop",
      })
      .get(".modal-upload-button")
      .should("be.disabled");
  });
});

describe("Clicking and uploading non-PDF file disables Continue button", () => {
  it("passes", () => {
    const filePath = "cypress/fixtures/example.json";
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get('input[type="file"]')
      .selectFile(filePath)
      .get(".modal-upload-button")
      .should("be.disabled");
  });
});

describe("Entering a arxiv.org PDF link opens PDF Viewer", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get(".modal-link-section")
      .type("https://arxiv.org/pdf/2211.13228.pdf")
      .get(".modal-upload-button")
      .click()
      .wait(20000)
      .get(".sa-pdf-viewer-page");
  });
});

describe("Entering a non-existent PDF link shows error message", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get(".modal-link-section")
      .type("http://google.com/test1.pdf")
      .get(".modal-upload-button")
      .click()
      .get(".modal-error-message")
      .contains("The input provided is not a valid pdf.");
  });
});

describe("Entering a non-existent PDF link disables Continue button", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get(".modal-link-section")
      .type("http://google.com/test1.pdf")
      .get(".modal-upload-button")
      .click()
      .get(".modal-upload-button")
      .should("be.disabled");
  });
});

describe("Entered data is cleared on clicking close button", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get(".modal-link-section")
      .type("http://google.com/test1.pdf")
      .get(".modal-close-button")
      .click()
      .get(".upload-pdf-button")
      .click()
      .get(".modal-link-section")
      .should("contain", "");
  });
});

describe("Loader Modal is showing while PDF link is being validated", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get(".modal-link-section")
      .type("https://arxiv.org/pdf/2211.13228.pdf")
      .get(".modal-upload-button")
      .click()
      .get(".sa-loader");
  });
});

describe("Clicking on Close button closes the Upload Modal", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get(".upload-pdf-button")
      .click()
      .get(".modal-link-section")
      .type("http://google.com/test1.pdf")
      .get(".modal-close-button")
      .click()
      .get(".upload-pdf-button");
  });
});
