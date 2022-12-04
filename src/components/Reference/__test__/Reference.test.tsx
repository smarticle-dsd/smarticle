import * as React from "react";
import { render } from "@testing-library/react";

import Reference from "../Reference";

describe("Reference tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<Reference />);
    const element = container.querySelector(".sa-reference");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<Reference domID="reference" />);
    const element = container.querySelector("#reference");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<Reference dataTestId="test-reference" />);
    const element = container.querySelector('[data-testid="test-reference"]');
    expect(element).not.toBe(null);
  });
});
