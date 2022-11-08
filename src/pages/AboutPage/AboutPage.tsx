import React, { useMemo, FC } from "react";
import cs from "classnames";

import { AboutPageProps } from "./AboutPage.types";
import { Header } from "../../components";


const AboutPage: FC<AboutPageProps> = ({
  domID = "about-page",
  dataTestId = "test-about-page",
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
      className={cs("sa-about-page", className)}
      data-testid={dataTestIDs.root}
    >
      <div>
        <Header/>
        About Page
        </div>
    </div>
  );
};

export default AboutPage;
