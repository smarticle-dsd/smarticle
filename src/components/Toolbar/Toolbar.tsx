import React, { useMemo, FC, useState } from "react";
import cs from "classnames";
import knowledgegraphpng from "./graph.png";
import referencespng from "./references.png";
import summarypng from "./summary.png";
import { ToolbarProps } from "./Toolbar.types";

const Toolbar: FC<ToolbarProps> = ({
  domID = "toolbar",
  dataTestId = "test-toolbar",
  className,
  sidebarval,
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
  const [sidebarshowval, changeval] = useState(false);

  const actions = [
    {
      label: "KnowledgeGraph",
      icon: knowledgegraphpng,
      onClick: () => {
        changeval(true);
        sidebarval?.(sidebarshowval, 1);
      },
    },
    {
      label: "References",
      icon: referencespng,
      onClick: () => {
        changeval(true);
        sidebarval?.(sidebarshowval, 2);
      },
    },
    {
      label: "Summary",
      icon: summarypng,
      onClick: () => {
        changeval(true);
        sidebarval?.(sidebarshowval, 3);
      },
    },
  ];

  return (
    <div
      id={domIDs.root}
      className={cs("sa-toolbar", className)}
      data-testid={dataTestIDs.root}
    >
      <ul>
        {actions.map((action) => (
          <li key={action.label} onClick={action.onClick}>
            <img src={action.icon} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toolbar;
