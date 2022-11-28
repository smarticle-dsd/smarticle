import * as React from "react";
import { render } from "@testing-library/react";

import Summary from "../Summary";

describe("Summary tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<Summary />);
    const element = container.querySelector(".sa-summary");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<Summary domID="summary" />);
    const element = container.querySelector("#summary");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<Summary dataTestId="test-summary" />);
    const element = container.querySelector('[data-testid="test-summary"]');
    expect(element).not.toBe(null);
  });
});
