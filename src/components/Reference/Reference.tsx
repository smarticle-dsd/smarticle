import React, { useMemo, FC } from "react";
import cs from "classnames";
import svg from "./refvec.svg";
import { Button } from "../Button";
import { ReferenceProps } from "./Reference.types";

const Reference: FC<ReferenceProps> = ({
  domID = "reference",
  dataTestId = "test-reference",
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
      className={cs("sa-reference", className)}
      data-testid={dataTestIDs.root}
    >
      <h1>Reference Details</h1>

      <div className={cs("reference-view-wrapper", className)}>
        <div className={cs("reference-view", className)}>
          <img src={svg} alt="Reference" />
          <h3>Click on a reference to preview it</h3>
        </div>
      </div>
      <canvas className={cs("referenceview-canvas", className)}></canvas>
      <div className={cs("referenceview-button", className)}>
        <Button size="large" type="primary">
          Jump to Content
        </Button>
      </div>
    </div>
  );
};

export default Reference;
