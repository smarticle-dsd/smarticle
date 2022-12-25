import * as React from "react";
import { render } from "@testing-library/react";

import CustomSummary from "../CustomSummary";

describe("CustomSummary tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<CustomSummary />);
    const element = container.querySelector(".sa-custom-summary");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<CustomSummary domID="custom-summary" />);
    const element = container.querySelector("#custom-summary");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <CustomSummary dataTestId="test-custom-summary" />,
    );
    const element = container.querySelector(
      '[data-testid="test-custom-summary"]',
    );
    expect(element).not.toBe(null);
  });
});
