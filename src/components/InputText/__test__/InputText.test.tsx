import * as React from "react";
import { render } from "@testing-library/react";

import InputText from "../InputText";

describe("InputText tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<InputText />);
    const element = container.querySelector(".sa-input-text");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<InputText domID="input-text" />);
    const element = container.querySelector("#input-text");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<InputText dataTestId="test-input-text" />);
    const element = container.querySelector('[data-testid="test-input-text"]');
    expect(element).not.toBe(null);
  });
});
