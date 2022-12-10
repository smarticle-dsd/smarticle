import * as React from "react";
import { render } from "@testing-library/react";

import SidebarError from "../SidebarError";

describe("SidebarError tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<SidebarError />);
    const element = container.querySelector(".sa-sidebar-error");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<SidebarError domID="sidebar-error" />);
    const element = container.querySelector("#sidebar-error");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <SidebarError dataTestId="test-sidebar-error" />,
    );
    const element = container.querySelector(
      '[data-testid="test-sidebar-error"]',
    );
    expect(element).not.toBe(null);
  });
});
