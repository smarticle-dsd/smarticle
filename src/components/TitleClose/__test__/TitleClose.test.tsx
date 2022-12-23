import * as React from "react";
import { render } from "@testing-library/react";

import TitleClose from "../TitleClose";

describe("TitleClose tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<TitleClose />);
    const element = container.querySelector(".sa-title-close");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<TitleClose domID="title-close" />);
    const element = container.querySelector("#title-close");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<TitleClose dataTestId="test-title-close" />);
    const element = container.querySelector('[data-testid="test-title-close"]');
    expect(element).not.toBe(null);
  });
});
