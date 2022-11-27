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
  useEffect(() => {
    async function getSummary(title: string) {
      const result = await API.post("backend", "/paperSummary", {
        body: {
          paperTitle: title,
        },
      });
      return result;
    }
    getSummary(paperTitle as string).then((result) => setSummary(result));
  }, [paperTitle]);

  return (
    <div
      id={domIDs.root}
      className={cs("sa-summary", className)}
      data-testid={dataTestIDs.root}
    >
      {summary.tldr && (
        <div>
          <h1>TLDR</h1>
          <p>{summary?.tldr?.text}</p>
          <h1>Abstract</h1>
          <p>{summary?.abstract}</p>
        </div>
      )}
    </div>
  );
};

export default Summary;
