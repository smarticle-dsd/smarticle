import React, { useMemo, FC, useState, useEffect } from "react";
import cs from "classnames";

import { SummaryProps } from "./Summary.types";

import { Amplify, API } from "aws-amplify";
import aws_exports from "../../aws-exports";
Amplify.configure(aws_exports);

async function getSummary(title: string) {
  console.log(title);
  const result = await API.post("backend", "/paperSummary", {
    body: {
      paperTitle: title,
    },
  });
  console.log(result);
  return result;
}

const Summary: FC<SummaryProps> = ({
  domID = "summary",
  dataTestId = "test-summary",
  className,
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

  const [summary, setSummary] = useState({});
  useEffect(() => {
    setSummary(getSummary("Self-Supervised Learning based on Heat Equation"));
  }, []);

  return (
    <div
      id={domIDs.root}
      className={cs("sa-summary", className)}
      data-testid={dataTestIDs.root}
    >
      {summary && (
        <div>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default Summary;
