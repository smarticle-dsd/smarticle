import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { KnowledgeGraphProps } from "./KnowledgeGraph.types";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { SidebarError } from "../SidebarError";
import { API } from "aws-amplify";

const KnowledgeGraph: FC<KnowledgeGraphProps> = ({
  domID = "knowledge-graph",
  dataTestId = "test-knowledge-graph",
  className,
  paperTitle,
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
  const [elements, setElements] = useState<any>([]);

  // Function to call backend to get nodes
  async function getElements(id: string | null, title: string | null) {
    try {
      const result = await API.post("backend", "/paperKnowledgeGraph", {
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
  // Get nodes on page load
  React.useEffect(() => {
    if (paperTitle && paperTitle.length > 0) {
      getElements(null, paperTitle).then((result) => {
        setElements(result);
        setError(false);
      });
    } else {
      setError(true);
    }
  }, [paperTitle]);

  const navigate = useNavigate();
  const sendToKG = () => {
    navigate("/testGraph?title=" + paperTitle);
  };

  return (
    <div
      id={domIDs.root}
      className={cs("sa-knowledge-graph", className)}
      data-testid={dataTestIDs.root}
    >
      <h1>Knowledge Graph</h1>
      <div className={cs("sa-knowledge-graph-wrapper", className)}>
        {!error ? (
          <Button
            className={cs("sa-knowledge-graph-button", className)}
            onClick={sendToKG}
          >
            View Knowledge Graph
          </Button>
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
            elements={elements}
            setElements={setElements}
            getElements={getElements}
          />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
