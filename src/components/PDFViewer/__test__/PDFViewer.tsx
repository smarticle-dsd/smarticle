import * as React from "react";
import { render } from "@testing-library/react";

import PDFViewer from "../PDFViewer";

describe("RedCircle tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<PDFViewer />);
    const element = container.querySelector(".sa-pdf-viewer");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<PDFViewer domID="pdf-viewer" />);
    const element = container.querySelector("#pdf-viewer");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<PDFViewer dataTestId="test-pdf-viewer" />);
    const element = container.querySelector('[data-testid="test-pdf-viewer"]');
    expect(element).not.toBe(null);
  });
});
