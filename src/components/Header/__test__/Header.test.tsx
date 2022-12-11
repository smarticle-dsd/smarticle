import * as React from "react";
import { render } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import Header from "../Header";

describe("Header tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const element = container.querySelector(".sa-header");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <Header domID="header" />
      </BrowserRouter>,
    );
    const element = container.querySelector("#header");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <BrowserRouter>
        <Header dataTestId="test-header" />
      </BrowserRouter>,
    );
    const element = container.querySelector('[data-testid="test-header"]');
    expect(element).not.toBe(null);
  });
});
