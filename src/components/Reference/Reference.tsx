import React, { useMemo, FC } from "react";
import cs from "classnames";
import svg from "./refvec.svg";
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

      <div className={cs("reffwrap", className)}>
        <div className={cs("reff", className)}>
          <img src={svg} alt="Reference" />
          <h3>Click on a reference to preview it</h3>
        </div>
      </div>
      <canvas className={cs("canv", className)}></canvas>
    </div>
  );
};

export default Reference;
