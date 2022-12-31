import React, { useMemo, FC } from "react";
import cs from "classnames";

import { KnowledgeGraphModalProps } from "./KnowledgeGraphModal.types";
import { TitleClose } from "../TitleClose";
import { formatDataForDisplay } from "../../shared/getDataForKnowledgeGraph";
import styled from "@emotion/styled";
import CytoscapeComponent from "react-cytoscapejs";
import { Button } from "../Button";
import { queryBackend } from "../../shared/queryBackend";
import { getMainNode } from "../../shared/getMainNodeForKnowledgeGraph";

const KnowledgeGraphModal: FC<KnowledgeGraphModalProps> = ({
  domID = "knowledge-graph-modal",
  dataTestId = "test-knowledge-graph-modal",
  className,
  isVisible,
  toggle,
  elements,
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

  let myCy: cytoscape.Core;
  // create a reference to the parent container element
  const containerRef = React.useRef<HTMLElement | null>(null);

  // use the useState hook to store the width and height of the component
  const [style, setStyle] = React.useState({});

  const [error, setError] = React.useState<boolean>(false);
  const [newElements, setNewElements] = React.useState<any>(elements);

  // update the width and height of the component when the component is mounted
  React.useEffect(() => {
    containerRef.current = document.getElementById("cytoscape-graph-container");
    if (containerRef.current) {
      setStyle({
        width: 0.85 * containerRef.current.clientWidth,
        height: 0.85 * containerRef.current.clientHeight,
      });
    }
  }, [containerRef, domIDs.root]);

  // update the width and height of the component whenever the parent container changes
  React.useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setStyle({
          width: 0.85 * containerRef.current.clientWidth,
          height: 0.85 * containerRef.current.clientHeight,
        });
      }
    }

    // add an event listener to listen for resize events
    window.addEventListener("resize", handleResize);
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires
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
    fit: true,
    pan: true,
    animate: true,
  };

  graphStyle[1].style["background-color"] = (node: any) =>
    getColorBasedOnType(node);

  const [node, selectNode] = React.useState<Record<string, string> | null>(
    getMainNode(elements),
  );

  const Container = styled.div`
    display: flex;
    justify-content: center;
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
    paddingright: 20px;
  `;

  function zoomOut() {
    myCy
      .animation({
        fit: {
          eles: newElements,
          padding: 10,
        },
        easing: "ease-in-out",
        duration: 1000,
      })
      .play();
  }

  const getElements = async (paperId: string) => {
    setNewElements([]);
    try {
      const result = await queryBackend("/paperKnowledgeGraph", {
        body: {
          paperId,
        },
      });
      if (result.length > 1) {
        setError(false);
        selectNode(getMainNode(result));
        setNewElements(result);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    }
  };

  return (
    <>
      {isVisible ? (
        <div
          id={domIDs.root}
          className={cs("sa-knowledge-graph-modal", className)}
          data-testid={dataTestIDs.root}
        >
          <div
            className={cs("sa-knowledge-graph-modal-wrapper", className)}
            id="cytoscape-graph-container"
            onClick={(e) => e.stopPropagation()}
          >
            <TitleClose titleText="Knowledge Graph" handleClose={toggle} />
            {error && (
              <div>
                <h3>An error occurred during graph loading!</h3>
              </div>
            )}
            {!error && (
              <div className={cs("sa-knowledge-graph-wrapper", className)}>
                <Container style={{ marginBottom: "8px" }}>
                  <InnerContainer>
                    <Cube style={{ backgroundColor: "#00BFFF" }} />
                    <span>Citations</span>
                  </InnerContainer>
                  <InnerContainer>
                    <Cube style={{ backgroundColor: "#009933" }} />
                    <span>References</span>
                  </InnerContainer>
                </Container>
                <div
                  className={cs("sa-knowledge-graph-modal-graph", className)}
                >
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
                            padding: 50,
                          },
                          easing: "ease-in-out",
                          duration: 1000,
                        }).play();
                      });
                      cy.on("ready", function () {
                        console.log("ready");
                        setTimeout(() => {
                          cy.animation({
                            fit: {
                              eles: newElements,
                              padding: 10,
                            },
                            easing: "ease-in-out",
                            duration: 1000,
                          }).play();
                        }, 500);
                      });
                      myCy = cy;
                    }}
                    elements={newElements}
                    style={style}
                    stylesheet={graphStyle}
                    layout={layout}
                    wheelSensitivity={0.2}
                    zoom={0.3}
                  />
                  {node ? (
                    <div
                      className={cs(
                        "sa-knowledge-graph-modal-node-details",
                        className,
                      )}
                    >
                      <PaperInfo>
                        <>
                          {/* <h3>Paper Details:</h3> */}
                          {Object.entries(formatDataForDisplay(node)).map(
                            (value) => {
                              return (
                                <div key={value[0]}>
                                  <p>
                                    <b>{value[0]}: </b>
                                    {value[1]}
                                  </p>
                                </div>
                              );
                            },
                          )}
                        </>
                      </PaperInfo>
                      <div
                        className={cs(
                          "sa-knowledge-graph-modal-node-buttons",
                          className,
                        )}
                      >
                        <Button
                          className={cs(
                            "sa-knowledge-graph-modal-details-button",
                            className,
                          )}
                          size="medium"
                          type="primary"
                          onClick={() => getElements(node.id)}
                        >
                          Set as Main Paper
                        </Button>
                        <Button
                          className={cs(
                            "sa-knowledge-graph-modal-zoom-out-button",
                            className,
                          )}
                          size="medium"
                          type="primary"
                          onClick={() => zoomOut()}
                        >
                          Zoom Out
                        </Button>
                        <Button
                          className={cs(
                            "sa-knowledge-graph-modal-reset-button",
                            className,
                          )}
                          size="medium"
                          type="primary"
                          onClick={() => {
                            setNewElements(elements);
                            selectNode(getMainNode(elements));
                          }}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
          <div
            className={cs("sa-knowledge-graph-modal-overlay")}
            onClick={() => toggle}
          ></div>
        </div>
      ) : null}
    </>
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
export default KnowledgeGraphModal;
