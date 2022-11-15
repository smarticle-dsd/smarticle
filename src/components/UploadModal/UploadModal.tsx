import React, { FC, useMemo, useState } from "react";
import cs from "classnames";

import { UploadModalProps } from "./UploadModal.types";
import Icons from "../../icons";

import AWS from "aws-sdk";
import { Button } from "../Button";

import { useNavigate } from "react-router-dom";

const UploadModal: FC<UploadModalProps> = ({
  domID = "upload-modal",
  dataTestId = "test-upload-modal",
  className,
  isVisible,
  toggle,
}): JSX.Element => {
  const domIDs = useMemo(
    () => ({
      root: domID,
    }),
    [domID],
  );

  const dataTestIds = useMemo(
    () => ({
      root: dataTestId,
    }),
    [dataTestId],
  );

  const bucketName = process.env.REACT_APP_BUCKET_NAME as string;
  const bucketRegion = process.env.REACT_APP_BUCKET_REGION as string;

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  });

  const navigate = useNavigate();

  const myBucket = new AWS.S3({
    params: { Bucket: bucketName },
    region: bucketRegion,
  });

  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState({
    name: "",
  });
  const [pdfLink, setPdfLink] = useState("");
  //accept the file input when user select or drop file
  const onUpload = (e: any) => {
    if (e.target.files.length > 0) {
      if (e.target.files[0].type === "application/pdf") {
        setSelectedFile(e.target.files[0]);
        setError("");
      } else {
        setSelectedFile(e.target.files[0]);
        setError(
          "The uploaded file is not supported. Only pdf files are allowed.",
        );
      }
    } else {
      setError("There was an error during upload. Please try again.");
    }
  };

  const handleUpload = (file: any) => {
    if (pdfLink !== "" && pdfLink.endsWith(".pdf")) {
      navigate("/pdfviewer?url=" + pdfLink);
    } else if (file.name !== "" && file.type === "application/pdf") {
      const params = {
        ACL: "public-read",
        Body: file,
        Bucket: bucketName,
        Key: file.name,
      };

      myBucket.putObject(params).send((err) => {
        if (!err) {
          navigate("/pdfviewer?file=" + file.name);
        } else {
          setError("There was an error during upload. Please try again.");
        }
      });
    } else {
      setError(
        "Please provide a pdf file or a link ending in pdf to continue.",
      );
    }
  };

  return (
    <>
      {isVisible ? (
        <div
          id={domIDs.root}
          className={cs("sa-upload-modal", className)}
          data-testid={dataTestIds.root}
        >
          <div
            className={cs("modal-wrapper", className)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={cs("title-and-close-button")}>
              <div className={cs("modal-title", className)}>Upload a paper</div>
              <Icons.CloseButton
                className={cs("modal-close-button", className)}
                onClick={() => toggle()}
              />
            </div>
            <div className={cs("modal-drop-area", className)}>
              <Icons.UploadCloudIcon className="upload-icon" />
              <p> Drop PDF here </p>
              <input
                type="file"
                value=""
                onChange={onUpload}
                onInput={() => {
                  setPdfLink("");
                }}
              />
            </div>
            <div className={cs("modal-select-button", className)}>
              <p> Choose a file </p>
              <input type="file" value="" onChange={onUpload} />
            </div>
            <div>{selectedFile && <p>{selectedFile?.name}</p>}</div>
            <div className={cs("modal-divider", className)}>or</div>
            <input
              className={cs("modal-link-section", className)}
              type="text"
              placeholder="Paste a link"
              onInput={() => {
                setSelectedFile({
                  name: "",
                });
              }}
              // onKeyDown={linkUpload}
              onChange={(event) => setPdfLink(event.target.value)}
            />
            <div>{error && <p>{error}</p>}</div>
            <Button
              className={cs("modal-upload-button", className)}
              size="large"
              type="primary"
              disabled={error.length === 0 ? false : true}
              onClick={() => handleUpload(selectedFile)}
            >
              Continue
            </Button>
          </div>

          <div
            className={cs("sa-upload-modal-overlay")}
            onClick={() => toggle()}
          ></div>
        </div>
      ) : null}
    </>
  );
};

export default UploadModal;
