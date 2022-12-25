import React, { useMemo, FC, useState, useCallback } from "react";
import cs from "classnames";

import { KnowledgeGraphProps } from "./KnowledgeGraph.types";
import { Button } from "../Button";
import { SidebarError } from "../SidebarError";
import { queryBackend } from "../../shared/queryBackend";
import { formatDataForDisplay } from "../../shared/getDataForKnowledgeGraph";
import { getMainNode } from "../../shared/getMainNodeForKnowledgeGraph";

const KnowledgeGraph: FC<KnowledgeGraphProps> = ({
  domID = "knowledge-graph",
  dataTestId = "test-knowledge-graph",
  className,
  paperTitle,
  setIsVisible,
  setElements,
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
  const [paperId, setPaperId] = useState<string>("");
  const [node, setNode] = useState<Record<string, string>>({});

  // Function to call backend to get nodes
  const getElements = useCallback(
    async (id: string | null, title: string | null) => {
      try {
        setPaperId("");
        const result = await queryBackend("/paperKnowledgeGraph", {
          body: {
            paperTitle: title,
            paperId: id,
          },
        });
        if (result.length > 1) {
          const main = getMainNode(result);
          if (main) {
            setPaperId(main.id);
            setNode(main);
            setError(false);
            setElements(result);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      }
    },
    [setElements],
  );
  // Get paper title status on page load
  React.useEffect(() => {
    if (paperTitle && paperTitle.length > 0) {
      getElements(null, paperTitle);
      setError(false);
    } else {
      setPaperId("");
      setError(true);
    }
  }, [getElements, paperTitle]);

  // const navigate = useNavigate();
  const sendToKG = () => {
    setIsVisible(true);
    // navigate("/testGraph?title=" + paperTitle);
    // window.open(
    //   window.location.origin.toString() + "/testGraph?paper=" + paperId,
    //   "_blank",
    // );
  };

  return (
    <div
      id={domIDs.root}
      className={cs("sa-knowledge-graph", className)}
      data-testid={dataTestIDs.root}
    >
      <h1>Knowledge Graph</h1>
      <div className={cs("sa-knowledge-graph-wrapper", className)}>
        {!error && paperId.length > 0 ? (
          <>
            <div className={cs("sa-knowledge-graph-details", className)}>
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
            </div>
            <div className={cs("sa-knowledge-graph-button-wrapper", className)}>
              <Button
                className={cs("sa-knowledge-graph-button", className)}
                onClick={sendToKG}
                disabled={error}
              >
                Open Knowledge Graph
              </Button>
            </div>
          </>
        ) : null}
        <div>
          <SidebarError
            paperTitle={paperTitle}
            message={
              error
                ? "Paper ID not found!"
                : "Is this not the right summary for the uploaded paper?"
            }
            severity={error ? "error" : "info"}
            getData={getElements}
          />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
