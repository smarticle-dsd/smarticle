import React, { useMemo, FC } from "react";
import cs from "classnames";

import { Error404PageProps } from "./Error404Page.types";
import { Button, RedCircle } from "../../components";
import { useNavigate } from "react-router-dom";

const Error404Page: FC<Error404PageProps> = ({
  domID = "error404-page",
  dataTestId = "test-error404-page",
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

  const navigate = useNavigate();

  const onBackToMainPageButtonClick = () => {
    navigate("/");
  };

  return (
    <div
      id={domIDs.root}
      className={cs("sa-error404-page", className)}
      data-testid={dataTestIDs.root}
    >
      <RedCircle text="Not found!" />
      <Button type="primary" size="large" onClick={onBackToMainPageButtonClick}>
        Back to main page!
      </Button>
    </div>
  );
};

export default Error404Page;
