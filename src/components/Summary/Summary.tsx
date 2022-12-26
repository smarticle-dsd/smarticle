import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { SummaryProps } from "./Summary.types";
import { SidebarError } from "../SidebarError";
import { Button } from "../Button";
import { CustomSummary } from "../CustomSummary";
import { SidebarZoom } from "../SidebarZoom";
import { getCustomSummary, getSummary } from "../../shared/getDataForSummary";

const Summary: FC<SummaryProps> = ({
  domID = "summary",
  dataTestId = "test-summary",
  className,
  paperTitle,
  summary,
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

  const [loading, setLoading] = useState<boolean>(false);
  const [customSummary, setCustomSummary] = useState<string | null>(
    "Please select a section of the text to view summary of the section.",
  );

  // Get selected text when "Generate Summary" button is clicked and query backend to get custom text summary
  const handleCustomSummary = () => {
    setLoading(true);
    setCustomSummary("Generating summary for selected text. Please wait...");
    const selectedText = (
      document.getElementById("pdf-js-viewer") as HTMLIFrameElement
    )?.contentDocument
      ?.getSelection()
      ?.toString();

    if (selectedText) {
      getCustomSummary(selectedText);
    } else
      setCustomSummary(
        "Please select a section of the text to view summary of the section.",
      );
  };

  const handleClose = () => {
    setCustomSummary(null);
  };

  const [fontSize, setFontSize] = useState<number>(14);
  const [zoomInDisabled, setZoomInDisabled] = useState<boolean>(false);
  const [zoomOutDisabled, setZoomOutDisabled] = useState<boolean>(false);
  const handleZoomIn = () => {
    setFontSize(fontSize + 1);
    if (fontSize === 15) {
      setZoomInDisabled(true);
      setZoomOutDisabled(false);
    } else {
      setZoomInDisabled(false);
      setZoomOutDisabled(false);
    }
  };
  const handleZoomOut = () => {
    setFontSize(fontSize - 1);
    if (fontSize < 13) {
      setZoomOutDisabled(true);
      setZoomInDisabled(false);
    } else {
      setZoomOutDisabled(false);
      setZoomInDisabled(false);
    }
  };

  return (
    <div
      id={domIDs.root}
      className={cs("sa-summary", className)}
      data-testid={dataTestIDs.root}
    >
      <div className={cs("sa-summary-tldr", className)}>
        <SidebarZoom
          titleText="Summary"
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          zoomInDisabled={zoomInDisabled}
          zoomOutDisabled={zoomOutDisabled}
        />
        {summary?.tldr && (
          <>
            <p id="summary-content" style={{ fontSize: `${fontSize}px` }}>
              {summary?.tldr}
            </p>
          </>
        )}
      </div>
      <div className={cs("sa-summary-abstract", className)}>
        {summary?.abstract && (
          <>
            <h2>Abstract</h2>
            <p id="summary-content" style={{ fontSize: `${fontSize}px` }}>
              {summary?.abstract}
            </p>
          </>
        )}
      </div>
      <div className={cs("sa-summary-custom", className)}>
        {customSummary !== null && (
          <div className={cs("sa-summary-custom-text", className)}>
            <CustomSummary
              summary={customSummary}
              fontSize={fontSize}
              handleClose={handleClose}
            />
          </div>
        )}
        <Button
          className={cs("sa-summary-custom-button", className)}
          disabled={loading}
          onClick={handleCustomSummary}
        >
          Generate Summary
        </Button>
      </div>
      <div className={cs("sa-summary-error", className)}>
        <SidebarError
          paperTitle={paperTitle}
          message={
            summary
              ? "Paper ID not found!"
              : "Is this not the right summary for the uploaded paper?"
          }
          getData={getSummary}
          severity={summary ? "error" : "info"}
        />
      </div>
    </div>
  );
};
export default Summary;
