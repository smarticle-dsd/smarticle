import React, {
  useMemo,
  FC,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import cs from "classnames";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
// import { TextLayerBuilder } from "pdfjs-dist/types/web/text_layer_builder";

import { PDFViewerProps } from "./PDFViewer.types";

const PDFViewer: FC<PDFViewerProps> = ({
  domID = "pdf-viewer",
  dataTestId = "test-pdf-viewer",
  className,
  url = "",
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

  const container = document.getElementById("sa-pdf-viewer-container");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pdfRef, setPdfRef] = useState<any>(null);
  //const [currentPage, setCurrentPage] = useState<number>(1);

  pdfjs.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry");

  const renderPage = useCallback(
    (pageNum: number, pdf = pdfRef) => {
      pdf &&
        pdf.getPage(pageNum).then((page: any) => {
          //setCurrentPage(pageNum);
          const div = document.createElement("div");
          div.setAttribute("id", "page-" + (page.pageIndex + 1));
          div.setAttribute("style", "position: relative");
          if (container) {
            container.appendChild(div);
          }
          const canvas = document.createElement("canvas");
          div.appendChild(canvas);
          const viewport = page.getViewport({ scale: 1.5, rotation: 0 });
          if (canvas) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;
          }
          const ctx = canvas?.getContext("2d");
          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };
          page.render(renderContext);
          // .then(() => {
          //   return page.getTextContent();
          // })
          // .then((textContent: any) => {
          //   const textLayerDiv: HTMLDivElement =
          //     document.createElement("div");
          //   textLayerDiv.setAttribute("class", "textLayer");
          //   div.appendChild(textLayerDiv);

          //   const textLayer = new TextLayerBuilder({
          //     textLayerDiv: textLayerDiv,
          //     eventBus: "",
          //     pageIndex: page.pageIndex,
          //     viewport: viewport,
          //   });

          //   textLayer.setTextContent(textContent);
          //   textLayer.render();
          // });
        });
    },
    [container, pdfRef],
  );

  const renderPages = useCallback(
    (pdfRef: any) => {
      for (let num = 1; num <= pdfRef?.numPages; num++) {
        renderPage(num, pdfRef);
      }
    },
    [renderPage],
  );

  useEffect(() => {
    renderPages(pdfRef);
  }, [pdfRef, renderPages]);

  useEffect(() => {
    const loadingTask = pdfjs.getDocument(url);
    loadingTask.promise.then((loadedPdf: any) => {
      setPdfRef(loadedPdf);
    });
  }, [url]);

  // const nextPage = () =>
  //   pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);

  // const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div
      id={domIDs.root}
      className={cs("sa-pdf-viewer", className)}
      data-testid={dataTestIDs.root}
    >
      <div id="sa-pdf-viewer-container">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default PDFViewer;
