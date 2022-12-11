import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { Error404PageProps } from "./Error404Page.types";
import { useNavigate } from "react-router-dom";

import Icons from "../../icons";

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

  const [isError, setIsError] = useState(true);

  const navigate = useNavigate();

  const onBackToHomePageButtonClick = () => {
    navigate("/");
  };

  return (
    <div
      id={domIDs.root}
      className={cs("sa-error404-page", className)}
      data-testid={dataTestIDs.root}
    >
      {isError ? (
        <Icons.ErrorBackgroundCircles
          className={cs("background-circles", className)}
        />
      ) : (
        <Icons.ErrorGreenBackgroundCircles
          className={cs("background-circles", className)}
        />
      )}

      <div className={cs("error-page-wrapper", className)}>
        <div className={cs("error-wrapper", className)}>
          {isError ? (
            <Icons.Error404Icon
              className={cs("icon-box", className)}
              onMouseEnter={() => setIsError(false)}
            />
          ) : (
            <Icons.ToHomeIcon
              className={cs("icon-box", className)}
              onClick={onBackToHomePageButtonClick}
              onMouseLeave={() => setIsError(true)}
            />
          )}
          <h1>Page not found</h1>
          <p>
            Sorry, we can't seem to find the page you're looking for, please try
            going back to the{" "}
            <span onClick={onBackToHomePageButtonClick}>home page</span>.
          </p>
          {/*<Button
            type="primary"
            size="large"
            onClick={onBackToHomePageButtonClick}
          >
            Back to main page!
          </Button>*/}
        </div>
        {isError ? (
          <Icons.MissingPaper className={cs("paper-icon", className)} />
        ) : (
          <Icons.AvailablePaper className={cs("paper-icon", className)} />
        )}
      </div>
    </div>
  );
};

export default Error404Page;
