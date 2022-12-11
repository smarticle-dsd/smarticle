/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo, FC, useState } from "react";
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

  const [error, setError] = useState<boolean>(false);

  // create a reference to the parent container element
  const containerRef = React.useRef<HTMLDivElement>(null);

  // use the useState hook to store the width and height of the component
  const [style, setStyle] = React.useState({});

  // update the width  of the component when the component is mounted
  React.useEffect(() => {
    if (containerRef.current) {
      setStyle({ width: containerRef.current.offsetWidth, height: 500 });
    }
  }, []);

  // update the width of the component whenever the parent container changes
  React.useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setStyle({ width: containerRef.current.offsetWidth, height: 500 });
      }
    }

    // add an event listener to listen for resize events
    window.addEventListener("resize", handleResize);
  });

  // eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-var-requires
  const elements = require("./response.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
  const graphStyle = require("./cy-style.json");

  const layout = {
    name: "concentric",
    startAngle: 0 * Math.PI,
    minNodeSpacing: 20,
    edgeLengthVal: 80,
    /* boundingBox: {
      x1: 100,
      y1: 100,
      w: 600 - 100,
      h: 500,
    }, */
    concentric: function (node: any) {
      return node.degree();
    },
    levelWidth: function (nodes: []) {
      return 2;
    },
    fit: "true",
    animate: "true",
  };

  graphStyle[1].style["background-color"] = (node: any) =>
    getColorBasedOnType(node);

  const [selectedPaperTitle, selectNode] = useState();

  return (
    <div
      id={domIDs.root}
      className={cs("sa-knowledge-graph", className)}
      data-testid={dataTestIDs.root}
      ref={containerRef}
    >
      <h1>Knowledge Graph</h1>
      {error && (
        <div>
          <div>
            <img src={"/knowledgeGraph-error.svg"} alt="Paper not found" />
            <h3>Paper ID not found!</h3>
          </div>
        </div>
      )}
      {!error && (
        <CytoscapeComponent
          cy={(cy) => {
            cy.on("select", "node", (event) => {
              // get the selected node
              const node = event.target;

              // get the data associated with the node
              const data = node.data();
              setError(false);

              // do something with the data here
              selectNode(data.label);
            });
          }}
          elements={elements}
          style={style}
          stylesheet={graphStyle}
          layout={layout}
          wheelSensitivity={0.2}
          pan={{ x: 100, y: 200 }}
          zoom={0.3}
        />
      )}
      <span>{selectedPaperTitle}</span>
    </div>
  );
};

function getColorBasedOnType(obj: any) {
  switch (obj.data("type")) {
    case "main":
      return "#8B0000";
    case "citation":
      return "#00BFFF";
    case "reference":
      return "#009933";
    default:
      return "black";
  }
}

export default KnowledgeGraph;
