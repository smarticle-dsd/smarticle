import React, { useMemo, FC } from "react";
import cs from "classnames";

import { SidebarErrorProps } from "./SidebarError.types";
import { Button } from "../Button";

const SidebarError: FC<SidebarErrorProps> = ({
  domID = "sidebar-error",
  dataTestId = "test-sidebar-error",
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
      className={cs("sa-sidebar-error", className)}
      data-testid={dataTestIDs.root}
    >
      <div className={cs("sidebar-error-view-image-wrapper", className)}>
        <div className={cs("sidebar-error-view-image", className)}>
          <img src={"/sidebar-error.svg"} alt="Paper not found" />
          <h3>Paper ID not found!</h3>
        </div>
      </div>
      <div className={cs("sidebar-error-paper-input")}>
        <div className={cs("sidebar-error-input-header", className)}>
          <h3>Enter the paper's ID manually:</h3>
        </div>
        <div className={cs("sidebar-error-input-section", className)}>
          <input
            className={cs("sidebar-error-input-text", className)}
            type="text"
            placeholder="Enter ID"
            onInput={() => {}}
            onChange={(event) => {}}
          />
          <div className={cs("sidebar-error-button", className)}>
            <Button size="large" type="primary" onClick={() => {}}>
              Submit ID
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarError;
