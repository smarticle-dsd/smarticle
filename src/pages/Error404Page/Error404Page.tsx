import React, { useMemo, FC } from "react";
import cs from "classnames";

import { Error404PageProps } from "./Error404Page.types";
import { RedCircle } from "../../components";

const Error404Page: FC<Error404PageProps> = ({
  domID = "error404-page",
  dataTestId = "test-error404-page",
  className,
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
      className={cs("sa-error404-page", className)}
      data-testid={dataTestIDs.root}
    >
      <RedCircle text="Not found!" />
    </div>
  );
};

export default Error404Page;
