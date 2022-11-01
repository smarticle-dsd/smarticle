import React, { useMemo, FC } from "react";
import cs from "classnames";

import { RedCircleProps } from "./RedCircle.types";

const RedCircle: FC<RedCircleProps> = ({
  domID = "red-circle",
  dataTestId = "test-red-circle",
  className,
  text,
}): JSX.Element => {
  const domIDs = useMemo(
    () => ({
      root: domID,
    }),
    [domID]
  );

  const dataTestIDs = useMemo(
    () => ({
      root: dataTestId,
    }),
    [dataTestId]
  );

  return (
    <div
      id={domIDs.root}
      className={cs("sa-red-circle", className)}
      data-testid={dataTestIDs.root}
    >
      <div>{text}</div>
    </div>
  );
};

export default RedCircle;
