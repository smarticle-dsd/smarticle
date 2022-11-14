import * as React from "react";
import { render } from "@testing-library/react";

import RedCircle from "../RedCircle";

describe("RedCircle tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<RedCircle />);
    const element = container.querySelector(".sa-red-circle");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<RedCircle domID="red-circle" />);
    const element = container.querySelector("#red-circle");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<RedCircle dataTestId="test-red-circle" />);
    const element = container.querySelector('[data-testid="test-red-circle"]');
    expect(element).not.toBe(null);
  });
});
