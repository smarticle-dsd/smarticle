import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { TestGraphPageProps } from "./TestGraphPage.types";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";

import CytoscapeComponent from "react-cytoscapejs";

import { Button } from "../../components";
import { queryBackend } from "../../shared/queryBackend";
import { formatDataForDisplay } from "../../shared/getDataForKnowledgeGraph";

const TestGraphPage: FC<TestGraphPageProps> = ({
  domID = "test-graph-page",
  dataTestId = "test-test-graph-page",
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

  const [searchParams] = useSearchParams();
  const paperId: string | null = searchParams.get("paper");

  let myCy: cytoscape.Core;

  const [elements, setElements] = useState<any>([]);

  // Function to call backend to get summary
  async function getElements(id: string | null, title: string | null) {
    try {
      const result = await queryBackend("/paperKnowledgeGraph", {
        body: {
          paperTitle: title,
          paperId: id,
        },
      });
      if (result.length > 1) {
        setError(false);
        return result;
      } else {
        setError(true);
        return {};
      }
    } catch (e) {
      setError(true);
      return {};
    }
  }
  // Get summary on page load
  React.useEffect(() => {
    getElements(paperId, null).then((result) => {
      setElements(result);
    });
  }, [paperId]);

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
  /* const elements = require("./response.json"); */

  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
  const graphStyle = require("./cy-style.json");

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
    fit: "true",
    animate: "true",
  };

  graphStyle[1].style["background-color"] = (node: any) =>
    getColorBasedOnType(node);

  const [node, selectNode] = useState<Record<string, string> | null>(null);

  const Container = styled.div`
    display: flex;
    justify-content: center;
    paddingbottom: 20px;
  `;

  const InnerContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px; /* add padding between InnerContainer elements */
  `;

  const Cube = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 2px; /* round the edges */
    background-color: #ff0000;
    margin: 0 10px;
  `;

  const PaperInfo = styled.div`
    paddingtop: 20px;
  `;

  function zoomOut() {
    myCy
      .animation({
        fit: {
          eles: elements,
          padding: 10,
        },
        easing: "ease-in-out",
        duration: 1000,
      })
      .play();
  }

  return (
    <div
      id={domIDs.root}
      className={cs("sa-test-graph-page", className)}
      data-testid={dataTestIDs.root}
      ref={containerRef}
    >
      <div className={cs("sa-test-graph-page-header", className)}>
        <div className={cs("sa-test-graph-page-header-title", className)}>
          <h1>Knowledge Graph</h1>
        </div>
        <div className={cs("sa-test-graph-page-header-button", className)}>
          <Button /// <reference path="buttonRef" />
            size="large"
            type="primary"
            onClick={() => zoomOut()}
          >
            Zoom Out
          </Button>
        </div>
      </div>
      {error && (
        <div>
          <h3>An error occurred during graph loading!</h3>
        </div>
      )}
      <Container>
        <InnerContainer>
          <Cube style={{ backgroundColor: "#00BFFF" }} />
          <span>Citations</span>
        </InnerContainer>
        <InnerContainer>
          <Cube style={{ backgroundColor: "#009933" }} />
          <span>References</span>
        </InnerContainer>
      </Container>
      {!error && (
        <CytoscapeComponent
          cy={(cy) => {
            cy.on("select", "node", (event) => {
              // get the selected node
              const node = event.target;

              // get the data associated with the node
              const data = node.data();

              // Can be set to true to emulate error handling in component
              setError(false);

              // do something with the data here
              selectNode(data);

              // Zoom onto selected node
              cy.animation({
                fit: {
                  eles: node,
                  padding: 200,
                },
                easing: "ease-in-out",
                duration: 1000,
              }).play();
            });
            myCy = cy;
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
      {node ? (
        <PaperInfo>
          <>
            {/* <h3>Paper Details:</h3> */}
            {Object.entries(formatDataForDisplay(node)).map((value) => {
              return (
                <div key={value[0]}>
                  <p>
                    <b>{value[0]}: </b>
                    {value[1]}
                  </p>
                </div>
              );
            })}
          </>
        </PaperInfo>
      ) : null}
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

export default TestGraphPage;
