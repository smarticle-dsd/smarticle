import React, { useMemo, FC } from "react";
import cs from "classnames";

import { CustomSummaryProps } from "./CustomSummary.types";
import { TitleClose } from "../TitleClose";

const CustomSummary: FC<CustomSummaryProps> = ({
  domID = "custom-summary",
  dataTestId = "test-custom-summary",
  className,
  summary,
  handleClose,
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
      className={cs("sa-custom-summary", className)}
      data-testid={dataTestIDs.root}
    >
      {summary && handleClose ? (
        <>
          <TitleClose
            titleText="Selected Text Summary"
            handleClose={handleClose}
          />
          <p>{summary}</p>
        </>
      ) : null}
    </div>
  );
};

export default CustomSummary;
