import React, { useMemo, FC } from "react";
import cs from "classnames";

import { SidebarProps } from "./Sidebar.types";

const Sidebar: FC<SidebarProps> = ({
  domID = "sidebar",
  dataTestId = "test-sidebar",
  className,
  content,
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
      {content}
    </div>
  );
};

export default Sidebar;
