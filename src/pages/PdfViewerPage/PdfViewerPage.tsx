import React, { useMemo, FC } from "react";
import cs from "classnames";

import { PdfViewerPageProps } from "./PdfViewerPage.types";
import { useSearchParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { TestTool } from "../../components";

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

  // const { filePath } = useParams();
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const file = searchParams.get("file");

  const bucketName = process.env.REACT_APP_BUCKET_NAME as string;
  const bucketRegion = process.env.REACT_APP_BUCKET_REGION as string;

  let pdfFile = "";
  if (url) {
    pdfFile = "/web/viewer.html?file=" + url;
  }
  if (file) {
    const baseUrl =
      "/web/viewer.html?file=https://" +
      bucketName +
      ".s3." +
      bucketRegion +
      ".amazonaws.com/";
    pdfFile = baseUrl + file;
  }

  const [referenceDetailsMountNode, setReferenceDetailsMountNode] =
    React.useState<HTMLElement | null | undefined>(null);
  const [knowledgeGraphMountNode, setKnowledgeGraphMountNode] = React.useState<
    HTMLElement | null | undefined
  >(null);
  const [summaryMountNode, setSummaryMountNode] = React.useState<
    HTMLElement | null | undefined
  >(null);

  const viewerRef = React.useCallback((node: HTMLIFrameElement) => {
    if (node !== null) {
      // This is not a solution...
      setTimeout(() => {
        setReferenceDetailsMountNode(
          node?.contentDocument?.getElementById("referenceDetailsView"),
        );
        setKnowledgeGraphMountNode(
          node?.contentDocument?.getElementById("knowledgeGraphView"),
        );
        setSummaryMountNode(
          node?.contentDocument?.getElementById("summaryView"),
        );
      }, 250);
    }
  }, []);

  return (
    <div
      id={domIDs.root}
      className={cs("sa-pdf-viewer-page", className)}
      data-testid={dataTestIDs.root}
    >
      {pdfFile && (
        <iframe
          id="pdf-js-viewer"
          src={pdfFile}
          title="webviewer"
          width="100%"
          height="100%"
          ref={viewerRef}
        >
          {referenceDetailsMountNode &&
            createPortal(<TestTool />, referenceDetailsMountNode)}
          {knowledgeGraphMountNode &&
            createPortal(<TestTool />, knowledgeGraphMountNode)}
          {summaryMountNode && createPortal(<TestTool />, summaryMountNode)}
        </iframe>
      )}
    </div>
  );
};

export default PdfViewerPage;
