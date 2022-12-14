import React, { useMemo, FC, useEffect, useState } from "react";
import cs from "classnames";

import { PdfViewerPageProps } from "./PdfViewerPage.types";
import { useSearchParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { Summary, KnowledgeGraph, KnowledgeGraphModal } from "../../components";
import { Reference, FeatureTooltipHandler } from "../../components";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";
import { Error404Page } from "../Error404Page";

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
    // Get title of paper by parsing the largest text on page 1
    async function getDetailedInfo(pdf: pdfjs.PDFDocumentProxy) {
      const page = await pdf.getPage(1);
      const content = await page.getTextContent();

      let maxHeight = 0;
      let headingData = "";
      content.items.forEach((item: TextItem | TextMarkedContent) => {
        if (
          (item as TextItem).height > maxHeight &&
          (item as TextItem).str.length > 1
        ) {
          // Ignore arxiv watermark
          if (!(item as TextItem).str.toLowerCase().includes("arxiv")) {
            maxHeight = (item as TextItem).height;
            headingData = (item as TextItem).str;
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
    pdfjs
      .getDocument(urlToLoad)
      .promise.then((pdfDoc: pdfjs.PDFDocumentProxy) => {
        getDetailedInfo(pdfDoc)
          .then(({ paperHeading }) => {
            setPaperTitle(paperHeading);
          })
          .catch((e) => {});
      })
      .catch((e) => {});
  }, [file, paperTitle, pdfFile, url]);

  const [referenceDetailsMountNode, setReferenceDetailsMountNode] =
    React.useState<HTMLElement | null | undefined>(null);
  const [knowledgeGraphMountNode, setKnowledgeGraphMountNode] = React.useState<
    HTMLElement | null | undefined
  >(null);
  const [summaryMountNode, setSummaryMountNode] = React.useState<
    HTMLElement | null | undefined
  >(null);

  const [viewerNode, setViewerNode] = React.useState<HTMLIFrameElement | null>(
    null,
  );
  const [sidebarCheckTimer, setSidebarCheckTimer] = React.useState<number>(0);

  // A react version of setInterval, once the viewerNode is loaded, we try to
  // set the reference details, knowledge graph and summary node states
  const TOOL_LOADING_INTERVAL = 100; // milliseconds

  React.useEffect(() => {
    if (!viewerNode) {
      setTimeout(
        () => setSidebarCheckTimer((cur) => cur + 1),
        TOOL_LOADING_INTERVAL,
      );
    } else {
      let needToUpdate = false;

      if (!referenceDetailsMountNode) {
        needToUpdate = true;
        setReferenceDetailsMountNode(
          viewerNode?.contentDocument?.getElementById("referenceDetailsView"),
        );
      }

      if (!knowledgeGraphMountNode) {
        needToUpdate = true;
        setKnowledgeGraphMountNode(
          viewerNode?.contentDocument?.getElementById("knowledgeGraphView"),
        );
      }

      if (!summaryMountNode) {
        needToUpdate = true;
        setSummaryMountNode(
          viewerNode?.contentDocument?.getElementById("summaryView"),
        );
      }

      if (needToUpdate) {
        setTimeout(
          () => setSidebarCheckTimer((cur) => cur + 1),
          TOOL_LOADING_INTERVAL,
        );
      }
    }
  }, [
    viewerNode,
    sidebarCheckTimer,
    referenceDetailsMountNode,
    knowledgeGraphMountNode,
    summaryMountNode,
  ]);

  // Once the iframe loads, set it in a state
  const viewerRef = React.useCallback((node: HTMLIFrameElement) => {
    if (node !== null) {
      setViewerNode(node);
    }
  }, []);

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [elements, setElements] = React.useState<Array<
    Record<string, Record<string, string>>
  > | null>(null);

  // Feature tooltips will appear only at user's first visit
  const prefix = "/pdfviewer/";
  const [isVisited, setIsVisited] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  const toogleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  useEffect(() => {
    const visited = localStorage.getItem("Visited");
    if (window.location.href.includes(prefix) && !visited) {
      //console.log({ localStorage });
      localStorage.setItem("Visited", "visited");
      setIsVisited(true);
    }
  }, []);

  return (
    <div
      id={domIDs.root}
      className={cs("sa-pdf-viewer-page", className)}
      data-testid={dataTestIDs.root}
    >
      {pdfFile.length > 0 ? (
        <>
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
              createPortal(
                <KnowledgeGraph
                  paperTitle={paperTitle}
                  setIsVisible={setIsVisible}
                  setElements={setElements}
                />,
                knowledgeGraphMountNode,
              )}
            {summaryMountNode &&
              createPortal(
                <Summary paperTitle={paperTitle} />,
                summaryMountNode,
              )}
          </iframe>
          {isVisible && (
            <KnowledgeGraphModal
              isVisible={isVisible}
              toggle={() => setIsVisible(false)}
              elements={elements}
            />
          )}
          {isVisited ? (
            <FeatureTooltipHandler
              isVisible={isTooltipVisible}
              close={toogleTooltip}
            />
          ) : null}
        </>
      ) : (
        <Error404Page />
      )}
    </div>
  );
};

export default PdfViewerPage;
