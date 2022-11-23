import React, { useMemo, FC } from "react";
import cs from "classnames";
import knowledgegraphpng from "./graph.png";
import referencespng from "./references.png";
import summarypng from "./summary.png";
import { ToolbarProps } from "./Toolbar.types";

const Toolbar: FC<ToolbarProps> = ({
  domID = "toolbar",
  dataTestId = "test-toolbar",
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

  const actions = [
    {
      label: "KnowledgeGraph",
      icon: knowledgegraphpng,
      onClick: () => alert("hi"),
    },
    { label: "References", icon: referencespng, onClick: console.log },
    { label: "Summary", icon: summarypng, onClick: console.log },
  ];

  return (
    <div
      id={domIDs.root}
      className={cs("sa-toolbar", className)}
      data-testid={dataTestIDs.root}
    >
      <ul>
        {actions.map((action, index) => (
          <li key={action.label} onClick={action.onClick}>
            <img src={action.icon} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toolbar;
