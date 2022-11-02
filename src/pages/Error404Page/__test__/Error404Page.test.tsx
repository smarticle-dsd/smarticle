import * as React from "react";
import { render } from "@testing-library/react";

import Error404Page from "../Error404Page";

describe("Error404Page tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<Error404Page />);
    const element = container.querySelector(".sa-error404-page");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<Error404Page domID="error404-page" />);
    const element = container.querySelector("#error404-page");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <Error404Page dataTestId="test-error404-page" />,
    );
    const element = container.querySelector(
      '[data-testid="test-error404-page"]',
    );
    expect(element).not.toBe(null);
  });
});
