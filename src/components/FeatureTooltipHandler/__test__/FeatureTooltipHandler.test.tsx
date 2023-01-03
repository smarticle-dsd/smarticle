import * as React from "react";
import { render } from "@testing-library/react";

import FeatureTooltipHandler from "../FeatureTooltipHandler";

describe("FeatureTooltipHandler tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<FeatureTooltipHandler />);
    const element = container.querySelector(".sa-feature-tooltip-handler");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(
      <FeatureTooltipHandler domID="feature-tooltip-handler" />,
    );
    const element = container.querySelector("#feature-tooltip-handler");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <FeatureTooltipHandler dataTestId="test-feature-tooltip-handler" />,
    );
    const element = container.querySelector(
      '[data-testid="test-feature-tooltip-handler"]',
    );
    expect(element).not.toBe(null);
  });
});
