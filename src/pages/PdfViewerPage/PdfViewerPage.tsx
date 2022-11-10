import React, { useMemo, FC } from "react";
import cs from "classnames";

import { PdfViewerPageProps } from "./PdfViewerPage.types";
import { useParams } from "react-router-dom";

const PdfViewerPage: FC<PdfViewerPageProps> = ({
  domID = "pdf-viewer-page",
  dataTestId = "test-pdf-viewer-page",
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

  const baseUrl = "/web/viewer.html?file=";
  const { filePath } = useParams();
  const pdfFile = baseUrl + filePath;

  return (
    <div
      id={domIDs.root}
      className={cs("sa-pdf-viewer-page", className)}
      data-testid={dataTestIDs.root}
    >
      {filePath && (
        <iframe
          id="pdf-js-viewer"
          src={pdfFile}
          title="webviewer"
          width="100%"
          height="100%"
        ></iframe>
      )}
    </div>
  );
};

export default PdfViewerPage;
