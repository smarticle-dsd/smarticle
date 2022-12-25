import * as React from "react";
import { render } from "@testing-library/react";

import SidebarZoom from "../SidebarZoom";

describe("SidebarZoom tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<SidebarZoom />);
    const element = container.querySelector(".sa-sidebar-zoom");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<SidebarZoom domID="sidebar-zoom" />);
    const element = container.querySelector("#sidebar-zoom");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <SidebarZoom dataTestId="test-sidebar-zoom" />,
    );
    const element = container.querySelector(
      '[data-testid="test-sidebar-zoom"]',
    );
    expect(element).not.toBe(null);
  });
});
