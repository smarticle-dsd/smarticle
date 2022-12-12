import * as React from "react";
import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import HomePage from "../HomePage";

describe("HomePage tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>,
    );
    const element = container.querySelector(".sa-home-page");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage domID="home-page" />
      </BrowserRouter>,
    );
    const element = container.querySelector("#home-page");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <HomePage dataTestId="test-home-page" />
      </BrowserRouter>,
    );
    const element = container.querySelector('[data-testid="test-home-page"]');
    expect(element).not.toBe(null);
  });
});
