import React, { useMemo, FC } from "react";
import cs from "classnames";

import { TestToolProps } from "./TestTool.types";

const TestTool: FC<TestToolProps> = ({
  domID = "test-tool",
  dataTestId = "test-test-tool",
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
      className={cs("sa-test-tool", className)}
      data-testid={dataTestIDs.root}
    >
      <div className="data">TestTool</div>
    </div>
  );
};

export default TestTool;
