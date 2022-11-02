import * as React from "react";
import { render } from "@testing-library/react";

import AboutPage from "../AboutPage";

describe("AboutPage tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<AboutPage />);
    const element = container.querySelector(".sa-about-page");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<AboutPage domID="about-page" />);
    const element = container.querySelector("#about-page");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<AboutPage dataTestId="test-about-page" />);
    const element = container.querySelector('[data-testid="test-about-page"]');
    expect(element).not.toBe(null);
  });
});
