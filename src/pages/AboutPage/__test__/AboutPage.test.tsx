import * as React from "react";
import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import AboutPage from "../AboutPage";

describe("AboutPage tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>,
    );
    const element = container.querySelector(".sa-about-page");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <AboutPage domID="about-page" />
      </BrowserRouter>,
    );
    const element = container.querySelector("#about-page");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <AboutPage dataTestId="test-about-page" />
      </BrowserRouter>,
    );
    const element = container.querySelector('[data-testid="test-about-page"]');
    expect(element).not.toBe(null);
  });
});
