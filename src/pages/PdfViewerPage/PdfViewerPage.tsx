import React, { useMemo, FC } from "react";
import cs from "classnames";
import { PdfViewerPageProps } from "./PdfViewerPage.types";
import { PDFViewer } from "../../components/PDFViewer";

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

  return (
    <div
      id={domIDs.root}
      className={cs("sa-pdf-viewer-page", className)}
      data-testid={dataTestIDs.root}
    >
      <div>Pdf Viewer Page</div>
      <PDFViewer url="test3.pdf"></PDFViewer>
    </div>
  );
};

export default PdfViewerPage;
