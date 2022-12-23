/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { KnowledgeGraphProps } from "./KnowledgeGraph.types";
import { SidebarError } from "../SidebarError";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

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

  const [elements, setElements] = useState<any>([]);

  // Function to call backend to get summary
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
  // Get summary on page load
  React.useEffect(() => {
    if (paperTitle.length > 0) {
      getElements(null, paperTitle).then((result) => {
        setElements(result);
        setError(false);
      });
    } else {
      setError(true);
    }
  }, [paperTitle]);

  const [error, setError] = useState<boolean>(false);
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
        <Button
          className={cs("sa-knowledge-graph-button", className)}
          onClick={sendToKG}
          disabled={error}
        >
          View Knowledge Graph
        </Button>
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
