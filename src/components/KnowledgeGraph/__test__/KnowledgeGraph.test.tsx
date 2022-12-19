import * as React from "react";
import { render } from "@testing-library/react";

import KnowledgeGraph from "../KnowledgeGraph";

describe("KnowledgeGraph tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<KnowledgeGraph paperTitle="test" />);
    const element = container.querySelector(".sa-knowledge-graph");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(
      <KnowledgeGraph domID="knowledge-graph" paperTitle="test" />,
    );
    const element = container.querySelector("#knowledge-graph");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(
      <KnowledgeGraph dataTestId="test-knowledge-graph" paperTitle="test" />,
    );
    const element = container.querySelector(
      '[data-testid="test-knowledge-graph"]',
    );
    expect(element).not.toBe(null);
  });
});
