import * as React from "react";
import { render } from "@testing-library/react";

import Button from "../Button";

describe("Button tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<Button />);
    const element = container.querySelector(".sa-button");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<Button domID="button" />);
    const element = container.querySelector("#button");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<Button dataTestId="test-button" />);
    const element = container.querySelector('[data-testid="test-button"]');
    expect(element).not.toBe(null);
  });
});
