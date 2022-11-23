import * as React from "react";
import { render } from "@testing-library/react";

import Sidebar from "../Sidebar";

describe("Sidebar tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<Sidebar />);
    const element = container.querySelector(".sa-sidebar");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<Sidebar domID="sidebar" />);
    const element = container.querySelector("#sidebar");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<Sidebar dataTestId="test-sidebar" />);
    const element = container.querySelector('[data-testid="test-sidebar"]');
    expect(element).not.toBe(null);
  });
});
