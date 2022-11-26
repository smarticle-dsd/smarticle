import React, { useMemo, FC } from "react";
import cs from "classnames";

import CytoscapeComponent from "react-cytoscapejs";

import { KnowledgeGraphProps } from "./KnowledgeGraph.types";

const KnowledgeGraphh: FC<KnowledgeGraphProps> = ({
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

  /* const cy = cytoscape({
    // very commonly used options
    container: undefined,
    elements: [
    ],
    style: [
    ],
    layout: { name: "grid" },
    data: {
    },

    // initial viewport state:
    zoom: 1,
    pan: { x: 0, y: 0 },

    // interaction options:
    minZoom: 1e-50,
    maxZoom: 1e50,
    zoomingEnabled: true,
    userZoomingEnabled: true,
    panningEnabled: true,
    userPanningEnabled: true,
    boxSelectionEnabled: true,
    selectionType: "single",
    touchTapThreshold: 8,
    desktopTapThreshold: 4,
    autolock: false,
    autoungrabify: false,
    autounselectify: false,

    // rendering options:
    headless: false,
    styleEnabled: true,
    hideEdgesOnViewport: false,
    textureOnViewport: false,
    motionBlur: false,
    motionBlurOpacity: 0.2,
    wheelSensitivity: 1,
    pixelRatio: "auto",
  }); */

  /* const elements = [
    {
      group: "nodes",
      data: { id: "one", label: "Node 1" },
      position: { x: 0, y: 0 },
    },
    {
      group: "nodes",
      data: { id: "two", label: "Node 2" },
      position: { x: 100, y: 0 },
    },
    {
      group: "nodes",
      data: { id: "three", label: "Node 3" },
      position: { x: 100, y: 0 },
    },
    {
      group: "edges",
      data: {
        source: "one",
        target: "two",
        label: "Edge from Node1 to Node2",
      },
    },
    {
      group: "edges",
      data: {
        source: "two",
        target: "three",
        label: "Edge from Node2 to Node3",
      },
    },
  ]; */

  const elements = [
    { data: { id: "1", label: "Node 1" } },
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
  ];

  const layout = {
    name: "concentric",
    startAngle: 0 * Math.PI,
    minNodeSpacing: 20,
    edgeLengthVal: 40,
    concentric: function (node: any) {
      return node.degree();
    },
    levelWidth: function (nodes: []) {
      return 2;
    },
  };

  return (
    <div
      id={domIDs.root}
      className={cs("sa-knowledge-graph", className)}
      data-testid={dataTestIDs.root}
    >
      <CytoscapeComponent
        elements={elements}
        style={{ width: "500px", height: "500px" }}
        layout={layout}
      />
    </div>
  );
};

export default KnowledgeGraphh;
