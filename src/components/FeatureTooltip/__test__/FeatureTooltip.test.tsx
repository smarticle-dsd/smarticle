import * as React from "react";
import { render } from "@testing-library/react";

import FeatureTooltip from "../FeatureTooltip";

describe("FeatureTooltip tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<FeatureTooltip />);
    const element = container.querySelector(".sa-feature-tooltip");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<FeatureTooltip domID="feature-tooltip" />);
    const element = container.querySelector("#feature-tooltip");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <FeatureTooltip dataTestId="test-feature-tooltip" />,
    );
    const element = container.querySelector(
      '[data-testid="test-feature-tooltip"]',
    );
    expect(element).not.toBe(null);
  });
});
