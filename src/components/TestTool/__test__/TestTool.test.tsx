import * as React from "react";
import { render } from "@testing-library/react";

import TestTool from "../TestTool";

describe("TestTool tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<TestTool />);
    const element = container.querySelector(".sa-test-tool");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<TestTool domID="test-tool" />);
    const element = container.querySelector("#test-tool");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<TestTool dataTestId="test-test-tool" />);
    const element = container.querySelector('[data-testid="test-test-tool"]');
    expect(element).not.toBe(null);
  });
});
