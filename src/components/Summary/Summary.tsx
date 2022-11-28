import React, { useMemo, FC, useState, useEffect } from "react";
import cs from "classnames";

import { SummaryProps } from "./Summary.types";

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

  const [summary, setSummary] = useState<any>({});
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    async function getSummary(title: string) {
      try {
        const result = await API.post("backend", "/paperSummary", {
          body: {
            paperTitle: title,
          },
        });
        setError(false);
        return result;
      } catch (e) {
        setError(true);
        return {};
      }
    }
    getSummary(paperTitle as string).then((result) => {
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
        {error && (
          <p>Semantic Scholar does not have any information on your paper.</p>
        )}
        {summary.tldr && summary.tldr.text && (
          <>
            <h1>Summary</h1>
            <p>{summary?.tldr?.text}</p>
          </>
        )}
        {summary.abstract && (
          <>
            <h2>Abstract</h2>
            <p>{summary?.abstract}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Summary;
