import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { SidebarErrorProps } from "./SidebarError.types";
import { Button } from "../Button";

const SidebarError: FC<SidebarErrorProps> = ({
  domID = "sidebar-error",
  dataTestId = "test-sidebar-error",
  className,
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

  // Function to get summary for manual id input
  const handlePaperIdInput = async (paperId: string) => {
    if (summary && setSummary && getSummary) {
      setSummary({});
      setPaperId(paperId);
      getSummary(paperId as string, null).then(
        (result: Record<string, string>) => {
          setSummary(result);
        },
      );
    }
  };
  return (
    <div
      id={domIDs.root}
      className={cs("sa-sidebar-error", className)}
      data-testid={dataTestIDs.root}
    >
      <div className={cs("sidebar-error-view-image-wrapper", className)}>
        <div className={cs("sidebar-error-view-image", className)}>
          <img
            src={
              severity === "error" ? "/sidebar-error.svg" : "/sidebar-error.svg"
            }
            alt={
              severity === "error"
                ? "Paper not found"
                : "Incorrect paper retrieved"
            }
          />
          <h3>{message}</h3>
        </div>
      </div>
      <div className={cs("sidebar-error-paper-input")}>
        <div className={cs("sidebar-error-input-header", className)}>
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
          <div className={cs("sidebar-error-button", className)}>
            <Button
              size="large"
              type="primary"
              onClick={() => handlePaperIdInput(paperId)}
            >
              Submit ID
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarError;
