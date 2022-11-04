import * as React from "react";
import { render } from "@testing-library/react";

import PdfViewerPage from "../PdfViewerPage";

describe("PdfViewerPage tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<PdfViewerPage />);
    const element = container.querySelector(".sa-pdf-viewer-page");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<PdfViewerPage domID="pdf-viewer-page" />);
    const element = container.querySelector("#pdf-viewer-page");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <PdfViewerPage dataTestId="test-pdf-viewer-page" />,
    );
    const element = container.querySelector(
      '[data-testid="test-pdf-viewer-page"]',
    );
    expect(element).not.toBe(null);
  });
});
