import React, { useMemo, FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import cs from "classnames";

import { LoaderProps } from "./Loader.types";

const Loader: FC<LoaderProps> = ({
  domID = "loader",
  dataTestId = "test-loader",
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
      className={cs("sa-loader", className)}
      data-testid={dataTestIDs.root}
    >
      <CircularProgress color="success" />
    </div>
  );
};

export default Loader;
