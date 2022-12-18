import React, { useMemo, FC } from "react";
import cs from "classnames";

import { TestGraphPageProps } from "./TestGraphPage.types";
import { KnowledgeGraph } from "../../components";

const TestGraphPage: FC<TestGraphPageProps> = ({
  domID = "test-graph-page",
  dataTestId = "test-test-graph-page",
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

  return (
    <div
      id={domIDs.root}
      className={cs("sa-test-graph-page", className)}
      data-testid={dataTestIDs.root}
    >
      <KnowledgeGraph paperId="74YznjI4XpavHyy6QrUw91YlRNrOa0kr4c3k1j3N" />
    </div>
  );
};

export default TestGraphPage;
