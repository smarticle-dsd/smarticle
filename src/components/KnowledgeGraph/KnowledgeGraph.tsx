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

  /* const elements = [
    { data: { id: "1", label: "Node 1", type: "main" } },
    { data: { id: "2", label: "Node 2" } },
    { data: { id: "3", label: "Node 3" } },
    { data: { id: "4", label: "Node 4" } },
    { data: { id: "5", label: "Node 5" } },
    { data: { id: "6", label: "Node 6" } },
    { data: { id: "7", label: "Node 7" } },
    { data: { id: "8", label: "Node 8" } },
    { data: { id: "9", label: "Node 9" } },
    {
      data: { source: "1", target: "2", label: "Edge from Node1 to Node2" },
    },
    {
      data: { source: "1", target: "3", label: "Edge from Node1 to Node3" },
    },
    {
      data: { source: "1", target: "4", label: "Edge from Node1 to Node4" },
    },
    {
      data: { source: "1", target: "5", label: "Edge from Node1 to Node5" },
    },
    {
      data: { source: "1", target: "6", label: "Edge from Node1 to Node6" },
    },
    {
      data: { source: "1", target: "7", label: "Edge from Node1 to Node7" },
    },
    {
      data: { source: "1", target: "8", label: "Edge from Node1 to Node8" },
    },
    {
      data: { source: "1", target: "9", label: "Edge from Node1 to Node9" },
    },
  ]; */

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

  const stylesheet = [
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
  ];

  return (
    <div
      id={domIDs.root}
      className={cs("sa-knowledge-graph", className)}
      data-testid={dataTestIDs.root}
    >
      <CytoscapeComponent
        elements={elements}
        style={{ width: "1000px", height: "1000px" }}
        stylesheet={stylesheet}
        layout={layout}
      />
    </div>
  );
};

function getColorBasedOnType(obj: any) {
  console.log(obj.data("type"));
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
