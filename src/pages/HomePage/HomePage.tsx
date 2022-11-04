import React, { useMemo, FC } from "react";
import cs from "classnames";

import { HomePageProps } from "./HomePage.types";

const HomePage: FC<HomePageProps> = ({
  domID = "home-page",
  dataTestId = "test-home-page",
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
      className={cs("sa-home-page", className)}
      data-testid={dataTestIDs.root}
    >
      <div>HomePage</div>
    </div>
  );
};

export default HomePage;
