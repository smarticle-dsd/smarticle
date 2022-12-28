import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { FeatureTooltipHandlerProps } from "./FeatureTooltipHandler.types";
import FeatureTooltip from "../FeatureTooltip/FeatureTooltip";

const FeatureTooltipHandler: FC<FeatureTooltipHandlerProps> = ({
  domID = "feature-tooltip-handler",
  dataTestId = "test-feature-tooltip-handler",
  className,
  isVisible,
  close,
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

  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const nextTooltip = () => {
    setCurrentFeatureIndex(currentFeatureIndex + 1);
  };

  const prevTooltip = () => {
    setCurrentFeatureIndex(currentFeatureIndex - 1);
  };

  const featureTooltips = [
    <FeatureTooltip
      title=""
      close={close}
      firstButton="Skip"
      secButton="Next"
      onFistButtonClick={close}
      onSecButtonClick={nextTooltip}
    >
      <div className={cs("tooltip-welcome", className)}>
        <div className={cs("tooltip-welcome-title", className)}>Welcome</div>
        <div className={cs("tooltip-welcome-text", className)}>
          This is a quick tutorial to help you get familiar with the basic
          functionality of Smarticle.
          <br />
          Go ahead and get started!
          <br />
          Yey!
        </div>
      </div>
    </FeatureTooltip>,
    <FeatureTooltip
      title="1/3"
      arrowType="top"
      close={close}
      firstButton="Prev"
      secButton="Next"
      onFistButtonClick={prevTooltip}
      onSecButtonClick={nextTooltip}
    >
      <div className={cs("tooltip-feature-text", className)}>
        Click here to find details about paper’s references or figures you want
        to check.
      </div>
    </FeatureTooltip>,
    <FeatureTooltip
      title="2/3"
      arrowType="top"
      close={close}
      firstButton="Prev"
      secButton="Next"
      onFistButtonClick={prevTooltip}
      onSecButtonClick={nextTooltip}
    >
      <div className={cs("tooltip-feature-text", className)}>
        Clicking here will generate a knowledge graph of the paper's references,
        you can check each reference’s detail by clicking on specific node
      </div>
    </FeatureTooltip>,
    <FeatureTooltip
      title="3/3"
      arrowType="top"
      close={close}
      firstButton="Prev"
      secButton="Next"
      onFistButtonClick={prevTooltip}
      onSecButtonClick={nextTooltip}
    >
      <div className={cs("tooltip-feature-text", className)}>
        By clicking here you will see the summary regarding the paper, and you
        can also generate summaries of the text you select.
      </div>
    </FeatureTooltip>,
    <FeatureTooltip
      title=""
      close={close}
      firstButton="Prev"
      secButton="Close"
      onFistButtonClick={prevTooltip}
      onSecButtonClick={close}
    >
      <div className={cs("tooltip-welcome", className)}>
        <div className={cs("tooltip-welcome-title", className)}>END</div>
        <div className={cs("tooltip-welcome-text", className)}>
          Thank you for viewing!
          <br />
          Continue your reading on Smarticle!
          <br />
          Go! Go!
        </div>
      </div>
    </FeatureTooltip>,
  ];

  return (
    <>
      {isVisible ? (
        <div
          id={domIDs.root}
          className={cs("sa-feature-tooltip-handler", className)}
          data-testid={dataTestIDs.root}
        >
          <div className={cs("tooltip-background-overlay", className)}></div>
          <div
            className={`tooltip-wrapper tooltip-wrapper-${
              currentFeatureIndex + 1
            }`}
          >
            {featureTooltips[currentFeatureIndex]}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FeatureTooltipHandler;
