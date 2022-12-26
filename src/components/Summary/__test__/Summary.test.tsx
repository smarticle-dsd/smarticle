import * as React from "react";
import { render } from "@testing-library/react";

import Summary from "../Summary";

import { Amplify, API } from "aws-amplify";
import aws_exports from "../../../aws-exports";
Amplify.configure(aws_exports);

describe("Summary tests", () => {
  test("Check if className exists on root DOM element", () => {
    const { container } = render(<Summary />);
    const element = container.querySelector(".sa-summary");
    expect(element).not.toBe(null);
  });

  test("Check if domID exists on root DOM element", () => {
    const { container } = render(<Summary domID="summary" />);
    const element = container.querySelector("#summary");
    expect(element).not.toBe(null);
  });

  test("Check if dataTestId exists on root DOM element", () => {
    const { container } = render(<Summary dataTestId="test-summary" />);
    const element = container.querySelector('[data-testid="test-summary"]');
    expect(element).not.toBe(null);
  });

  test("Check if summary endpoint returns null for empty string for paperId and paperTitle", async () => {
    const response = await API.post("backend", "/paperSummary", {
      body: {
        paperTitle: "",
        paperId: "",
      },
    });
    expect(response.abstract).toBeUndefined();
    expect(response.tldr).toBeNull();
  });

  test("Check if summary endpoint returns error message for null values for paperId and paperTitle", async () => {
    const response = await API.post("backend", "/paperSummary", {
      body: {
        paperTitle: null,
        paperId: null,
      },
    });
    expect(response.abstract).toBeUndefined();
    expect(response.tldr).toBeUndefined();
    expect(response.error).toBe("Cannot find the paper ID");
  });

  test("Check if summary endpoint returns abstract or tldr for null values for paperId and some value for paperTitle", async () => {
    const response = await API.post("backend", "/paperSummary", {
      body: {
        paperTitle: "Self-Supervised Learning based on Heat Equation",
        paperId: null,
      },
    });
    expect(response.abstract).not.toBeUndefined();
    expect(response.tldr).not.toBeUndefined();
    expect(response.error).toBeUndefined();
  });

  test("Check if summary endpoint returns abstract or tldr for null values for paperTitle and ACL ID value for paperId", async () => {
    const response = await API.post("backend", "/paperSummary", {
      body: {
        paperTitle: null,
        paperId: "ACL:W12-3903",
      },
    });
    expect(response.abstract).not.toBeUndefined();
    expect(response.tldr).not.toBeUndefined();
    expect(response.error).toBeUndefined();
  });

  test("Check if summary endpoint returns abstract or tldr for null values for paperTitle and S2 ID value for paperId", async () => {
    const response = await API.post("backend", "/paperSummary", {
      body: {
        paperTitle: null,
        paperId: "649def34f8be52c8b66281af98ae884c09aef38b",
      },
    });
    expect(response.abstract).not.toBeUndefined();
    expect(response.tldr).not.toBeUndefined();
    expect(response.error).toBeUndefined();
  });

  test("Check if summary endpoint returns abstract or tldr for null values for paperTitle and DOI ID value for paperId", async () => {
    const response = await API.post("backend", "/paperSummary", {
      body: {
        paperTitle: null,
        paperId: "10.1038/nrn3241",
      },
    });
    expect(response.abstract).not.toBeUndefined();
    expect(response.tldr).not.toBeUndefined();
    expect(response.error).toBeUndefined();
  });

  test("Check if summary endpoint returns abstract or tldr for null values for paperTitle and Arxiv ID value for paperId", async () => {
    const response = await API.post("backend", "/paperSummary", {
      body: {
        paperTitle: null,
        paperId: "arxiv:2211.14292",
      },
    });
    expect(response.abstract).not.toBeUndefined();
    expect(response.tldr).not.toBeUndefined();
    expect(response.error).toBeUndefined();
  });

  test("Check if summary endpoint returns abstract or tldr for null values for paperTitle and PubMed ID value for paperId", async () => {
    const response = await API.post("backend", "/paperSummary", {
      body: {
        paperTitle: null,
        paperId: "PMID:19872477",
      },
    });
    expect(response.abstract).not.toBeUndefined();
    expect(response.tldr).not.toBeUndefined();
    expect(response.error).toBeUndefined();
  });

  test("Check if summary endpoint returns abstract or tldr for null values for paperTitle and Corpus ID value for paperId", async () => {
    const response = await API.post("backend", "/paperSummary", {
      body: {
        paperTitle: null,
        paperId: "CorpusID:37220927",
      },
    });
    expect(response.abstract).not.toBeUndefined();
    expect(response.tldr).not.toBeUndefined();
    expect(response.error).toBeUndefined();
  });
});
