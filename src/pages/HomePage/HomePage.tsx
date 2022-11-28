import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { HomePageProps } from "./HomePage.types";
import { Button, UploadModal } from "../../components";
import Icons from "../../icons";

const HomePage: FC<HomePageProps> = ({
  domID = "home-page",
  dataTestId = "test-home-page",
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div
      id={domIDs.root}
      className={cs("sa-home-page", className)}
      data-testid={dataTestIDs.root}
    >
      <div>
        <Icons.BackgroundCircles
          className={cs("background-circles", className)}
        />
      </div>

      <h1 className={cs("sa-home-page-title", className)}>
        Welcome to smarticle!
      </h1>

      <h2 className={cs("home-page-slogan", className)}>
        Helping researchers focus on research.
      </h2>

      <h3 className={cs("sa-home-page-get-started", className)}>
        Get started by uploading a paper
      </h3>

      <Button
        className={cs("upload-pdf-button", className)}
        size="extralarge"
        onClick={openModal}
      >
        Upload a PDF
      </Button>

      <div className={cs("home-page-description-wrapper", className)}>
        <div className={cs("home-page-description", className)}>
          <Icons.UploadPdfIcon className={cs("home-page-icon", className)} />
          <h3>Upload PDFs</h3>
          <h4>Upload the paper from your device</h4>
        </div>
        <div className={cs("home-page-description", className)}>
          <Icons.ReferenceDetailsIcon
            className={cs("home-page-icon", className)}
          />
          <h3>Inspect Reference details</h3>
          <h4>
            Resolve cross-references of the paper with a mouse hover and click
          </h4>
        </div>
        <div className={cs("home-page-description", className)}>
          <Icons.KnowledgeGraphIcon
            className={cs("home-page-icon", className)}
          />
          <h3>Create a Knowledge graph</h3>
          <h4>
            Construct a knowledge graph regarding the references in the paper
          </h4>
        </div>
        <div className={cs("home-page-description", className)}>
          <Icons.SummaryIcon className={cs("home-page-icon", className)} />
          <h3>Generate a Summary</h3>
          <h4>Extract a summary for the various key components of the paper</h4>
        </div>
      </div>

      <UploadModal isVisible={isModalVisible} toggle={openModal} />
    </div>
  );
};

export default HomePage;
