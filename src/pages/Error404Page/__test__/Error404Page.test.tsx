import * as React from "react";
import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import Error404Page from "../Error404Page";

describe("Error404Page tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <Error404Page />
      </BrowserRouter>,
    );
    const element = container.querySelector(".sa-error404-page");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <Error404Page domID="error404-page" />
      </BrowserRouter>,
    );
    const element = container.querySelector("#error404-page");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <Error404Page dataTestId="test-error404-page" />
      </BrowserRouter>,
    );
    const element = container.querySelector(
      '[data-testid="test-error404-page"]',
    );
    expect(element).not.toBe(null);
  });
});
