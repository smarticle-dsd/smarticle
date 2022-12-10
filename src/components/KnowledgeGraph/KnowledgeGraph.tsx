import React, { useMemo, FC } from "react";
import cs from "classnames";
import CytoscapeComponent from "react-cytoscapejs";

import { KnowledgeGraphProps } from "./KnowledgeGraph.types";

const KnowledgeGraph: FC<KnowledgeGraphProps> = ({
  domID = "knowledge-graph",
  dataTestId = "test-knowledge-graph",
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

  // eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-var-requires
  const elements = require("./response.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
  const style = require("./cy-style.json");

  const layout = {
    name: "concentric",
    startAngle: 0 * Math.PI,
    minNodeSpacing: 20,
    edgeLengthVal: 80,
    concentric: function (node: any) {
      return node.degree();
    },
    levelWidth: function (nodes: []) {
      return 2;
    },
  };

  /* const stylesheet = [
    {
      selector: "node",
      style: {
        width: 20,
        height: 20,
        "background-color": (node: any) => getColorBasedOnType(node),
      },
    },
    {
      selector: "edge",
      style: {
        "line-color": (edge: any) => getColorBasedOnType(edge),
      },
    },
  ]; */

  style[1].style["background-color"] = (node: any) => getColorBasedOnType(node);

  //console.log(style);

  return (
    <div
      id={domIDs.root}
      className={cs("sa-knowledge-graph", className)}
      data-testid={dataTestIDs.root}
    >
      <CytoscapeComponent
        elements={elements}
        style={{ width: "500px", height: "500px" }}
        stylesheet={style}
        layout={layout}
        wheelSensitivity={0.2}
      />
    </div>
  );
};

function getColorBasedOnType(obj: any) {
  switch (obj.data("type")) {
    case "main":
      return "red";
    case "citation":
      return "blue";
    case "reference":
      return "green";
    default:
      return "black";
  }
}

export default KnowledgeGraph;
