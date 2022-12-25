import * as React from "react";
import { render } from "@testing-library/react";

import SupportedPaperList from "../SupportedPaperList";

describe("SupportedPaperList tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<SupportedPaperList />);
    const element = container.querySelector(".sa-supported-paper-list");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(
      <SupportedPaperList domID="supported-paper-list" />,
    );
    const element = container.querySelector("#supported-paper-list");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <SupportedPaperList dataTestId="test-supported-paper-list" />,
    );
    const element = container.querySelector(
      '[data-testid="test-supported-paper-list"]',
    );
    expect(element).not.toBe(null);
  });
});
