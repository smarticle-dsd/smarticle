import React, { useMemo, FC } from "react";
import cs from "classnames";

import { TitleCloseProps } from "./TitleClose.types";
import Icons from "../../icons";

const TitleClose: FC<TitleCloseProps> = ({
  domID = "title-close",
  dataTestId = "test-title-close",
  className,
  titleText,
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
      className={cs("sa-title-close", className)}
      data-testid={dataTestIDs.root}
    >
      <div className={cs("title-and-close-button")}>
        <div className={cs("modal-title", className)}>{titleText}</div>
        {handleClose ? (
          <Icons.CloseButton
            className={cs("modal-close-button", className)}
            onClick={() => handleClose()}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TitleClose;
