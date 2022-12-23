import React, { useMemo, FC } from "react";
import cs from "classnames";

import { SidebarZoomProps } from "./SidebarZoom.types";
import { Button } from "../Button";

const SidebarZoom: FC<SidebarZoomProps> = ({
  domID = "sidebar-zoom",
  dataTestId = "test-sidebar-zoom",
  className,
  titleText,
  handleZoomIn,
  handleZoomOut,
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
      className={cs("sa-sidebar-zoom", className)}
      data-testid={dataTestIDs.root}
    >
      <div className={cs("sa-sidebar-zoom-title", className)}>
        <h1>{titleText}</h1>
      </div>
      <div className={cs("sa-sidebar-zoom-buttons", className)}>
        <Button size="small" onClick={handleZoomIn}>
          +
        </Button>
        <Button size="small" onClick={handleZoomOut}>
          -
        </Button>
      </div>
    </div>
  );
};

export default SidebarZoom;
