import React, { useMemo, FC, useEffect, useState } from "react";
import cs from "classnames";

import { PdfViewerPageProps } from "./PdfViewerPage.types";
import { useSearchParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { TestTool, Summary } from "../../components";
import { Reference } from "../../components";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";

pdfjs.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry");

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
  const [paperTitle, setPaperTitle] = useState("");
  const baseUrl = "/web/viewer.html?file=";
  if (url) {
    pdfFile = baseUrl + url;
  }
  if (file) {
    const s3Url =
      "https://" + bucketName + ".s3." + bucketRegion + ".amazonaws.com/";
    pdfFile = baseUrl + s3Url + file;
  }

  useEffect(() => {
    async function getDetailedInfo(pdf: any) {
      const page = await pdf.getPage(1);
      const content = await page.getTextContent();

      let maxHeight = 0;
      let headingData = "";
      await content.items.forEach((item: { height: number; str: string }) => {
        if (item.height > maxHeight) {
          if (!item.str.toLowerCase().includes("arxiv")) {
            maxHeight = item.height;
            headingData = item.str;
          }
        }
      });
      return {
        paperHeading: headingData,
      };
    }
    let urlToLoad = "";
    if (file) {
      urlToLoad = pdfFile.split("file=")[1];
    } else if (url) {
      urlToLoad = url;
    }
    pdfjs.getDocument(urlToLoad).promise.then((pdfDoc: any) => {
      getDetailedInfo(pdfDoc).then(({ paperHeading }) => {
        setPaperTitle(paperHeading);
      });
    });
  }, [file, paperTitle, pdfFile, url]);

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
      }, 5000);
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
            createPortal(<Reference />, referenceDetailsMountNode)}
          {knowledgeGraphMountNode &&
            createPortal(<TestTool />, knowledgeGraphMountNode)}
          {summaryMountNode &&
            createPortal(
              // Need to find a way to get this from the PDF Viewer component
              <Summary paperTitle={paperTitle} />,
              summaryMountNode,
            )}
        </iframe>
      )}
    </div>
  );
};

export default PdfViewerPage;
