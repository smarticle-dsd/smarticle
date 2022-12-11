import React, { useMemo, FC, useState, useEffect } from "react";
import cs from "classnames";

import { SummaryProps } from "./Summary.types";

import { Amplify, API } from "aws-amplify";
import aws_exports from "../../aws-exports";
import { SidebarError } from "../SidebarError";
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

  const [summary, setSummary] = useState<Record<string, string>>({});
  const [error, setError] = useState<boolean>(false);

  // Function to call backend to get summary
  async function getSummary(id: string | null, title: string | null) {
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
      return {};
    }
  }
  // Get summary on page load
  useEffect(() => {
    getSummary(null, paperTitle as string).then((result) => {
      setSummary(result);
    });
  }, [paperTitle]);

  return (
    <div
      id={domIDs.root}
      className={cs("sa-summary", className)}
      data-testid={dataTestIDs.root}
    >
      <div>
        <h1>Summary</h1>
        {summary.tldr && (
          <>
            <p>{summary?.tldr}</p>
          </>
        )}
        {summary.abstract && (
          <>
            <h2>Abstract</h2>
            <p>{summary?.abstract}</p>
          </>
        )}
        <SidebarError
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
