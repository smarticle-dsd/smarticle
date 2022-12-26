import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { SidebarErrorProps } from "./SidebarError.types";
import { Button } from "../Button";
import { SupportedPaperList } from "../SupportedPaperList";
import { InputText } from "../InputText";
const SidebarError: FC<SidebarErrorProps> = ({
  // TODO: Add props for Knowledge graph
  domID = "sidebar-error",
  dataTestId = "test-sidebar-error",
  className,
  paperTitle,
  message,
  severity,
  getData,
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

  const [paperId, setPaperId] = useState<string>("");
  const [needsReset, setNeedsReset] = useState<boolean>(false);

  //Function to reset data to original data
  const handleResetData = async () => {
    setPaperId("");
    // Reset data for Knowledge graph and Summary based on paper title identified
    if (getData) {
      getData(null, paperTitle as string);
      setNeedsReset(false);
    }
  };

  // Function to get data for manual id input
  const handlePaperIdInput = async (paperId: string) => {
    // Get summary and knowledge graph from paper id
    if (getData) {
      setPaperId(paperId);
      getData(paperId as string, null);
      setNeedsReset(true);
    }
  };
  return (
    <div
      id={domIDs.root}
      className={cs("sa-sidebar-error", className)}
      data-testid={dataTestIDs.root}
    >
      {severity === "error" && (
        <div className={cs("sidebar-error-view-image-wrapper", className)}>
          <div className={cs("sidebar-error-view-image", className)}>
            <img src="/sidebar-error.svg" alt="Paper not found" />

            <h3>{message}</h3>
          </div>
        </div>
      )}
      <div className={cs("sidebar-error-paper-input")}>
        <div className={cs("sidebar-error-input-header", className)}>
          {severity !== "error" && <h3>Incorrect Information?</h3>}
          <h3>Enter the paper's ID manually:</h3>
        </div>
        <div className={cs("sidebar-error-input-section", className)}>
          <InputText
            domID={"sa-sidebar-error-input-text"}
            className={cs("sidebar-error-input-text", className)}
            value={paperId}
            placeholder="Enter ID"
            onChange={(event) => {
              setPaperId(event.target.value);
            }}
          />
          <div className={cs("sidebar-error-buttons")}>
            <Button
              className={cs("sidebar-submit-button", className)}
              size="large"
              type="primary"
              disabled={paperId.length === 0}
              onClick={() => handlePaperIdInput(paperId)}
            >
              Submit ID
            </Button>
            <Button
              size="large"
              className={cs("sidebar-reset-button", className)}
              type="primary"
              disabled={!needsReset}
              onClick={() => handleResetData()}
            >
              Reset
            </Button>
          </div>
          <SupportedPaperList />
        </div>
      </div>
    </div>
  );
};

export default SidebarError;
