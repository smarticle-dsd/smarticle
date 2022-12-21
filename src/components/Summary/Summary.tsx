import React, { useMemo, FC, useState, useEffect } from "react";
import cs from "classnames";

import { SummaryProps } from "./Summary.types";
import { SidebarError } from "../SidebarError";
import { Button } from "../Button";

import { Amplify, API } from "aws-amplify";
import aws_exports from "../../aws-exports";
Amplify.configure(aws_exports);

const Summary: FC<SummaryProps> = ({
  domID = "summary",
  dataTestId = "test-summary",
  className,
  paperTitle,
}): JSX.Element => {
  const domIDs = useMemo(
    () => ({
      root: domID,
    }),
    [domID],
  );

  const dataTestIDs = useMemo(
    () => ({
      root: dataTestId,
    }),
    [dataTestId],
  );

  const [summary, setSummary] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [customSummary, setCustomSummary] = useState<string | null>(null);
  // Function to call backend to get custom summary
  const getCustomSummary = async (text: string | undefined) => {
    setLoading(true);
    const result = await API.post("backend", "/customSummary", {
      body: {
        text,
      },
    });

    if (result.summary) setCustomSummary(result.summary);
    else
      setCustomSummary(
        "Summary could not be generated for the selected section.",
      );

    setLoading(false);
  };

  // Get selected text when "Generate Summary" button is clicked and query backend to get custom text summary
  const handleCustomSummary = () => {
    setCustomSummary("Generating summary for selected text. Please wait...");
    const selectedText = (
      document.getElementById("pdf-js-viewer") as HTMLIFrameElement
    )?.contentDocument
      ?.getSelection()
      ?.toString();

    if (selectedText) {
      getCustomSummary(selectedText);
    } else
      setCustomSummary(
        "Please select a section of the text to view summary of the section.",
      );
  };

  // Function to call backend to get summary
  const getSummary = async (id: string | null, title: string | null) => {
    try {
      const result = await API.post("backend", "/paperSummary", {
        body: {
          paperTitle: title,
          paperId: id,
        },
      });
      if (result.abstract || result.tldr) {
        setError(false);
        return result;
      } else {
        setError(true);
        return null;
      }
    } catch (e) {
      setError(true);
      return null;
    }
  };
  // Get summary on page load
  useEffect(() => {
    if (paperTitle !== "") {
      getSummary(null, paperTitle as string).then((result) => {
        setSummary(result);
      });
    }
  }, [paperTitle]);

  return (
    <div
      id={domIDs.root}
      className={cs("sa-summary", className)}
      data-testid={dataTestIDs.root}
    >
      <div className={cs("sa-summary-custom", className)}>
        <div className={cs("sa-summary-custom-text", className)}>
          {customSummary && (
            <>
              <h2>Selected Text Summary</h2>
              <p>{customSummary}</p>
            </>
          )}
        </div>
        <Button
          className={cs("sa-summary-custom-button", className)}
          disabled={loading}
          onClick={handleCustomSummary}
        >
          Generate Summary
        </Button>
      </div>
      <div className={cs("sa-summary-tldr", className)}>
        <h1>Summary</h1>
        {summary?.tldr && (
          <>
            <p>{summary?.tldr}</p>
          </>
        )}
      </div>
      <div className={cs("sa-summary-abstract", className)}>
        {summary?.abstract && (
          <>
            <h2>Abstract</h2>
            <p>{summary?.abstract}</p>
          </>
        )}
      </div>
      <div className={cs("sa-summary-error", className)}>
        <SidebarError
          paperTitle={paperTitle}
          message={
            error
              ? "Paper ID not found!"
              : "Is this not the right summary for the uploaded paper?"
          }
          summary={summary}
          setSummary={setSummary}
          getSummary={getSummary}
          severity={error ? "error" : "info"}
        />
      </div>
    </div>
  );
};
export default Summary;
