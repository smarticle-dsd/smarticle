import React, {
  useMemo,
  FC,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import cs from "classnames";
import { PdfViewerPageProps } from "./PdfViewerPage.types";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
//import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

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

  const canvasRef = useRef<any>();
  const [pdfRef, setPdfRef] = useState<any>();
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const url = "test3.pdf";

  pdfjs.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry");

  const renderPage = useCallback(
    (pageNum: number, pdf = pdfRef) => {
      pdf &&
        pdf.getPage(pageNum).then((page: any) => {
          const viewport = page.getViewport({ scale: 1.5, rotation: 0 });
          const canvas = canvasRef.current;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: canvas?.getContext("2d"),
            viewport: viewport,
          };
          page.render(renderContext);
          console.log(renderContext);
        });
    },
    [pdfRef],
  );
  useEffect(() => {
    renderPage(1, pdfRef);
  }, [pdfRef, 1, renderPage]);

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
      className={cs("sa-pdf-viewer-page", className)}
      data-testid={dataTestIDs.root}
    >
      <div>Pdf Viewer Page</div>
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default PdfViewerPage;
