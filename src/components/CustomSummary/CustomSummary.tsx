import React, { useMemo, FC } from "react";
import cs from "classnames";

import { CustomSummaryProps } from "./CustomSummary.types";
import Icons from "../../icons";

const CustomSummary: FC<CustomSummaryProps> = ({
  domID = "custom-summary",
  dataTestId = "test-custom-summary",
  className,
  summary,
  setSummary,
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
      {summary && setSummary ? (
        <>
          <div className={cs("title-and-close-button")}>
            <div className={cs("modal-title", className)}>
              Selected Text Summary
            </div>
            <Icons.CloseButton
              className={cs("modal-close-button", className)}
              onClick={() => setSummary(null)}
            />
          </div>
          <p>{summary}</p>
        </>
      ) : null}
    </div>
  );
};

export default CustomSummary;
