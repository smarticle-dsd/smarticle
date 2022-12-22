import React, { useMemo, FC } from "react";
import cs from "classnames";

import { TestGraphPageProps } from "./TestGraphPage.types";
import { KnowledgeGraph } from "../../components";
import { useSearchParams } from "react-router-dom";

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

  const [searchParams] = useSearchParams();
  const title: string | null = searchParams.get("title");

  return (
    <div
      id={domIDs.root}
      className={cs("sa-test-graph-page", className)}
      data-testid={dataTestIDs.root}
    >
      {title ? <KnowledgeGraph paperTitle={title} /> : null}
    </div>
  );
};

export default TestGraphPage;
