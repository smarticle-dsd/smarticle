import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { KnowledgeGraphProps } from "./KnowledgeGraph.types";
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
  const [manualTitle, setManualTitle] = useState<string>("");

  // Function to call backend to get nodes
  async function getElements(id: string | null, title: string | null) {
    try {
      setManualTitle("");
      const result = await API.post("backend", "/paperKnowledgeGraph", {
        body: {
          paperTitle: title,
          paperId: id,
        },
      });
      if (result.length > 1) {
        const main = result.filter(
          (node: Record<string, Record<string, string>>) =>
            node.data.type === "main",
        );
        setManualTitle(main[0].data.label);
        setError(false);
        return result;
      } else {
        setError(true);
        return null;
      }
    } catch (e) {
      setError(true);
      return null;
    }
  }
  // Get paper title status on page load
  React.useEffect(() => {
    if (paperTitle && paperTitle.length > 0) {
      getElements(null, paperTitle);
      setError(false);
    } else {
      setManualTitle("");
      setError(true);
    }
  }, [paperTitle]);

  // const navigate = useNavigate();
  const sendToKG = () => {
    // navigate("/testGraph?title=" + paperTitle);
    window.open(
      window.location.origin.toString() + "/testGraph?title=" + manualTitle,
      "_blank",
    );
  };

  return (
    <div
      id={domIDs.root}
      className={cs("sa-knowledge-graph", className)}
      data-testid={dataTestIDs.root}
    >
      <h1>Knowledge Graph</h1>
      <div className={cs("sa-knowledge-graph-wrapper", className)}>
        {!error && manualTitle.length > 0 ? (
          <div className={cs("sa-knowledge-graph-details", className)}>
            <h2>Paper Title</h2>
            <p>{manualTitle}</p>
            <div>
              <Button
                className={cs("sa-knowledge-graph-button", className)}
                onClick={sendToKG}
              >
                Open Knowledge Graph
              </Button>
            </div>
          </div>
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
            getTitle={getElements}
          />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraph;
