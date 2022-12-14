import React, { FC, useMemo, useState } from "react";
import cs from "classnames";

import { UploadModalProps } from "./UploadModal.types";
import Icons from "../../icons";

import AWS, { AWSError } from "aws-sdk";
import { Button } from "../Button";

import { useNavigate } from "react-router-dom";
import { InputText } from "../InputText";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import { Loader } from "../Loader";
import { TitleClose } from "../TitleClose";

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

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfLink, setPdfLink] = useState("");
  async function isPdfValid(url: string) {
    try {
      setLoading(true);
      await pdfjs.getDocument({
        url,
        disableAutoFetch: true,
        disableStream: true,
      }).promise;
      setError("");
      return true;
    } catch (err) {
      setLoading(false);
      setError("The input provided is not a valid pdf.");
    }
  }
  //accept the file input when user select or drop file
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfLink("");
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      if (e.currentTarget.files[0].type === "application/pdf") {
        handleUpload(e.currentTarget.files[0]);
      } else {
        setError(
          "The uploaded file is not supported. Only pdf files are allowed.",
        );
      }
    } else {
      setError("There was an error during upload. Please try again.");
    }
  };

  const handleUpload = async (file: File | null) => {
    if (pdfLink !== "") {
      if (await isPdfValid(pdfLink)) {
        navigate("/pdfviewer/?url=" + pdfLink);
      }
    } else if (file && file.name !== "" && file.type === "application/pdf") {
      if (file.size < 50000000) {
        if (await isPdfValid(URL.createObjectURL(file))) {
          const params = {
            ACL: "public-read",
            Body: file,
            Bucket: bucketName,
            Key: file.name,
          };

          myBucket.putObject(params).send((err: AWSError) => {
            if (!err) {
              navigate("/pdfviewer/?file=" + file.name);
            } else {
              setError("There was an error during upload. Please try again.");
            }
          });
        }
      } else {
        setError("Please upload a pdf file smaller than 50 MB.");
      }
    } else {
      setError(
        "Please provide a pdf file or a link ending in pdf to continue.",
      );
    }
  };

  const handleToggle = () => {
    toggle();
    setSelectedFile(null);
    setPdfLink("");
    setError("");
    setLoading(false);
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
            <TitleClose titleText="Upload a paper" handleClose={handleToggle} />
            <div className={cs("modal-drop-area", className)}>
              <Icons.UploadCloudIcon className="upload-icon" />
              <p>
                Select or Drop
                <br />
                your PDF here
              </p>
              <input
                type="file"
                onChange={onUpload}
                onInput={() => {
                  setError("");
                  setPdfLink("");
                }}
              />
            </div>
            <div
              className={cs("modal-selected-file", className)}
              style={{
                visibility: selectedFile?.name === "" ? "hidden" : "visible",
              }}
            >
              {selectedFile?.name}
            </div>
            <div className={cs("modal-divider", className)}>or</div>

            <InputText
              domID="sa-upload-modal-input-text"
              className={cs("modal-link-section", className)}
              value={pdfLink}
              placeholder="Paste a link"
              onInput={() => {
                setSelectedFile(null);
                setError("");
              }}
              onChange={(event) => {
                setPdfLink(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && error.length === 0)
                  handleUpload(selectedFile);
              }}
            />

            <div className={cs("modal-support-message", className)}>
              Currently links are supported only for papers on arxiv.org
            </div>
            <div
              className={cs("modal-error-message", className)}
              style={{ visibility: error === "" ? "hidden" : "visible" }}
            >
              {error}
            </div>
            <Button
              className={cs("modal-upload-button", className)}
              size="large"
              type="primary"
              disabled={error.length === 0 ? false : true}
              onClick={() => handleUpload(selectedFile)}
            >
              Continue
            </Button>
            {loading ? (
              <div className={cs("loader-background", className)}>
                <div className={cs("loader-modal", className)}>
                  <Loader />
                </div>
              </div>
            ) : null}
          </div>

          <div
            className={cs("sa-upload-modal-overlay")}
            onClick={() => handleToggle()}
          ></div>
        </div>
      ) : null}
    </>
  );
};

export default UploadModal;
