import * as React from "react";
import { render } from "@testing-library/react";

import Toolbar from "../Toolbar";

describe("Toolbar tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<Toolbar />);
    const element = container.querySelector(".sa-toolbar");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<Toolbar domID="toolbar" />);
    const element = container.querySelector("#toolbar");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<Toolbar dataTestId="test-toolbar" />);
    const element = container.querySelector('[data-testid="test-toolbar"]');
    expect(element).not.toBe(null);
  });
});
