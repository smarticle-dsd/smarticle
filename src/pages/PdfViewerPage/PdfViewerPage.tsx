import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { PdfViewerPageProps } from "./PdfViewerPage.types";
import { useSearchParams } from "react-router-dom";
import { Toolbar } from "../../components";
import { Sidebar } from "../../components";

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
  let text = "";
  const [func, changefunc] = useState("");
  const [sidebarshow, changevals] = useState(false);
  const getsidebarshowval = (boolval: any, option: any) => {
    changevals(boolval);
    switch (option) {
      case 1:
        text = "Knowledge Graph";
        changefunc(text);
        break;
      case 2:
        text = "References";
        changefunc(text);
        break;
      case 3:
        text = "Summary";
        changefunc(text);
        break;
      default:
        alert("error");
    }
  };
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
          width={sidebarshow ? "80%" : "100%"}
          height="100%"
        ></iframe>
      )}
      <Toolbar sidebarval={getsidebarshowval} />
      {sidebarshow && <Sidebar content={func} />}
    </div>
  );
};

export default PdfViewerPage;
