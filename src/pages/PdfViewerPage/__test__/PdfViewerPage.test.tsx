import * as React from "react";
import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import PdfViewerPage from "../PdfViewerPage";

describe("PdfViewerPage tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <PdfViewerPage />
      </BrowserRouter>,
    );
    const element = container.querySelector(".sa-pdf-viewer-page");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <PdfViewerPage domID="pdf-viewer-page" />
      </BrowserRouter>,
    );
    const element = container.querySelector("#pdf-viewer-page");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <PdfViewerPage dataTestId="test-pdf-viewer-page" />
      </BrowserRouter>,
    );
    const element = container.querySelector(
      '[data-testid="test-pdf-viewer-page"]',
    );
    expect(element).not.toBe(null);
  });
});
