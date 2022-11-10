import React, { FC, useMemo } from "react";
import cs from "classnames";

import { UploadModalProps } from "./UploadModal.types";
import Icons from "../../icons";

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

  const onUpload = () => {};

  const linlkUpload = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      //
    }
  };
  return (
    <>
      {isVisible ? (
        <div
          id={domIDs.root}
          className={cs("sa-upload-modal", className)}
          data-testid={dataTestIds.root}
          onClick={() => toggle()}
        >
          <div
            className={cs("modal-wrapper", className)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={cs("modal-title", className)}>Upload a paper</div>
            <Icons.CloseButton
              className={cs("modal-close-button", className)}
              onClick={() => toggle()}
            />
            <div className={cs("modal-drop-area", className)}>
              <Icons.UploadCloudIcon className="upload-icon" />
              <p> Drop PDF here </p>
              <input type="file" value="" onChange={onUpload} />
            </div>
            <div className={cs("modal-select-button", className)}>
              <p> Choose a file </p>
              <input type="file" value="" onChange={onUpload} />
            </div>
            <input
              className={cs("modal-link-section", className)}
              type="text"
              placeholder="Paste a link"
              onKeyDown={linlkUpload}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UploadModal;
