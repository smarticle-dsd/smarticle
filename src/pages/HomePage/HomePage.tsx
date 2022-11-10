import React, { useMemo, FC, useState } from "react";
import cs from "classnames";

import { HomePageProps } from "./HomePage.types";
import { UploadModal } from "../../components";
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
      <h1>Welcome to smarticle!</h1>

      <h2 className={cs("home-page-slogan", className)}>
        Helping researchers focus on research.
      </h2>

      <h3>Get started by uploading a paper</h3>

      <button onClick={openModal}>Upload a PDF</button>

      <div className={cs("home-page-description-wrapper", className)}>
        <div>
          <Icons.BackgroundCircles
            className={cs("background-circles", className)}
          />
        </div>
        <div className={cs("home-page-description", className)}>
          <Icons.UploadPdfIcon className={cs("home-page-icon", className)} />
          <h3>Upload PDFs</h3>
          <h4>description</h4>
        </div>
        <div className={cs("home-page-description", className)}>
          <Icons.ReferenceDetailsIcon
            className={cs("home-page-icon", className)}
          />
          <h3>Inspect Reference details</h3>
          <h4>description</h4>
        </div>
        <div className={cs("home-page-description", className)}>
          <Icons.KnowledgeGraphIcon
            className={cs("home-page-icon", className)}
          />
          <h3>Create a Knowledge graph</h3>
          <h4>description</h4>
        </div>
        <div className={cs("home-page-description", className)}>
          <Icons.SummaryIcon className={cs("home-page-icon", className)} />
          <h3>Generate a Summary</h3>
          <h4>description</h4>
        </div>
      </div>

      <UploadModal isVisible={isModalVisible} toggle={openModal} />
    </div>
  );
};

export default HomePage;
