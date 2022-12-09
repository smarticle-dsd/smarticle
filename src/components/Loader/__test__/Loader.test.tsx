import * as React from "react";
import { render } from "@testing-library/react";

import Loader from "../Loader";

describe("Loader tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<Loader />);
    const element = container.querySelector(".sa-loader");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<Loader domID="loader" />);
    const element = container.querySelector("#loader");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<Loader dataTestId="test-loader" />);
    const element = container.querySelector('[data-testid="test-loader"]');
    expect(element).not.toBe(null);
  });
});
