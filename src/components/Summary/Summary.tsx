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

  const [summary, setSummary] = useState<any>({});
  const [error, setError] = useState<boolean>(false);
  async function getSummary(id: string | null, title: string | null) {
    try {
      const result = await API.post("backend", "/paperSummary", {
        body: {
          paperTitle: title,
          paperId: id,
        },
      });
      setError(false);
      return result;
    } catch (e) {
      setError(true);
      return {};
    }
  }
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
        {error && (
          <SidebarError
            message="Paper ID not found!"
            summary={summary}
            setSummary={setSummary}
            getSummary={getSummary}
          />
        )}
        {!error && (
          <SidebarError
            message="Is this not the right summary for the uploaded paper?"
            summary={summary}
            setSummary={setSummary}
            getSummary={getSummary}
          />
        )}
      </div>
    </div>
  );
};

export default Summary;
