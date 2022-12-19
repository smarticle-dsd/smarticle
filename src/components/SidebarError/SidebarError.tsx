import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { SidebarErrorProps } from "./SidebarError.types";
import { Button } from "../Button";
import { SupportedPaperList } from "../SupportedPaperList";

const SidebarError: FC<SidebarErrorProps> = ({
  // TODO: Add props for Knowledge graph
  domID = "sidebar-error",
  dataTestId = "test-sidebar-error",
  className,
  paperTitle,
  message,
  summary,
  setSummary,
  getSummary,
  severity,
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
    // TODO: Add code to reset data for Knowledge graph
    // Reset summary from paper title
    if (paperTitle && setSummary && getSummary) {
      setSummary({});
      getSummary(null, paperTitle as string).then((result) => {
        setSummary(result);
        setNeedsReset(false);
      });
    }
  };

  // Function to get data for manual id input
  const handlePaperIdInput = async (paperId: string) => {
    // TODO: Add code to get data for Knowledge graph from paper id
    // Get summary from paper id
    if (summary && setSummary && getSummary) {
      setSummary({});
      setPaperId(paperId);
      getSummary(paperId as string, null).then(
        (result: Record<string, string>) => {
          setSummary(result);
          setNeedsReset(true);
        },
      );
    }
    setPaperId("");
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
          <input
            className={cs("sidebar-error-input-text", className)}
            type="text"
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
              disabled={!needsReset && paperTitle !== null}
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
