import React, { useMemo, FC } from "react";
import cs from "classnames";

import { SidebarProps } from "./Sidebar.types";

const Sidebar: FC<SidebarProps> = ({
  domID = "sidebar",
  dataTestId = "test-sidebar",
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
      className={cs("sa-sidebar", className)}
      data-testid={dataTestIDs.root}
    >
      <div>Sidebar</div>
    </div>
  );
};

export default Sidebar;
