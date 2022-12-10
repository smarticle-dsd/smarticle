import * as React from "react";
import { render } from "@testing-library/react";

import TestGraphPage from "../TestGraphPage";

describe("TestGraphPage tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<TestGraphPage />);
    const element = container.querySelector(".sa-test-graph-page");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<TestGraphPage domID="test-graph-page" />);
    const element = container.querySelector("#test-graph-page");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <TestGraphPage dataTestId="test-test-graph-page" />,
    );
    const element = container.querySelector(
      '[data-testid="test-test-graph-page"]',
    );
    expect(element).not.toBe(null);
  });
});
