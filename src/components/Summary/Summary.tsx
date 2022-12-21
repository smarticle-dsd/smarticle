import React, { useMemo, FC, useState, useEffect } from "react";
import cs from "classnames";

import { SummaryProps } from "./Summary.types";

import { SidebarError } from "../SidebarError";

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

  // const [customSummary, setCustomSummary] = useState<string | null>(null);
  // // Function to call backend to get custom summary
  // async function getCustomSummary(text: string) {
  //   try {
  //     const result = await API.post("backend", "/customSummary", {
  //       body: {
  //         text,
  //       },
  //     });
  //     if (result.summary) {
  //       setError(false);
  //       setCustomSummary(result.summary);
  //       return result.summary;
  //     } else {
  //       setError(true);
  //       return null;
  //     }
  //   } catch (e) {
  //     setError(true);
  //     return null;
  //   }
  // }

  // Function to call backend to get summary
  async function getSummary(id: string | null, title: string | null) {
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
  }
  // Get summary on page load
  useEffect(() => {
    if (paperTitle !== "") {
      getSummary(null, paperTitle as string).then((result) => {
        setSummary(result);
        // if (result.abstract) {
        //   getCustomSummary(result.abstract);
        // }
      });
    }
  }, [paperTitle]);

  return (
    <div
      id={domIDs.root}
      className={cs("sa-summary", className)}
      data-testid={dataTestIDs.root}
    >
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
