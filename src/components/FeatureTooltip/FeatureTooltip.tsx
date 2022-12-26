import React, { useMemo, FC } from "react";
import cs from "classnames";

import { FeatureTooltipProps } from "./FeatureTooltip.types";
import { Button } from "../Button";
import Icons from "../../icons";

const FeatureTooltip: FC<FeatureTooltipProps> = ({
  domID = "feature-tooltip",
  dataTestId = "test-feature-tooltip",
  className,
  isVisible,
  arrowType = "without",
  title,
  text,
  firstButton,
  secButton,
  close,
  onFistButtonClick,
  onSecButtonClick,
  children,
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
    <>
      <div
        id={domIDs.root}
        className={cs("sa-feature-tooltip", className, arrowType)}
        data-testid={dataTestIDs.root}
      >
        <div>
          <div className={cs("title-and-close-button", className)}>
            <div className={cs("tooltip-title", className)}>{title}</div>
            <Icons.CloseButton
              className={cs("tooltip-close-button", className)}
              onClick={close}
            />
          </div>
          <div className={cs("tooltip-children", className)}>{children}</div>
          <div className={cs("tooltip-buttons", className)}>
            <Button
              className={cs("tooltip-first-button", className)}
              size="small"
              type="secondary"
              onClick={onFistButtonClick}
            >
              {firstButton}
            </Button>
            {secButton ? (
              <Button
                className={cs("tooltip-second-button", className)}
                size="small"
                onClick={onSecButtonClick}
              >
                {secButton}
              </Button>
            ) : null}
          </div>
        </div>
        <div className={cs("tooltip-overlay")} onClick={close}></div>
      </div>
    </>
  );
};

export default FeatureTooltip;
