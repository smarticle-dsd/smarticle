import React, { useMemo, FC } from "react";
import cs from "classnames";

import { AboutPageProps } from "./AboutPage.types";
import Icons from "../../icons";

const AboutPage: FC<AboutPageProps> = ({
  domID = "about-page",
  dataTestId = "test-about-page",
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

  return (
    <div
      id={domIDs.root}
      className={cs("sa-about-page", className)}
      data-testid={dataTestIDs.root}
    >
      <div className={cs("about-wrapper", className)}>
        <h1>About us</h1>
        <div className={cs("about-title", className)}>The product</div>
        <div className={cs("about-description", className)}>
          Reading PDFs is now an everyday action for all researchers, but
          manually searching for references, citations, figures, etc. contained
          in them can lead to wasted time.
          <br />
          Smarticle comes to the rescue with its ability to intelligently read
          PDFs, helping and enhancing the experience of reviewing documents. It
          offers several services to achieve this goal:
          <ol>
            <li>Work out cross references within the document;</li>
            <li>Building a knowledge graph on the references</li>
            <li>Generating a summary of the key components of the document.</li>
          </ol>
        </div>
        <div className={cs("about-title", className)}>ICSE SCORE 2023</div>
        <div className={cs("about-description", className)}>
          Smarticle is the development of one of the proposed projects for the
          ICSE SCORE 2023 competition, which runs from April 2022 to March 2023.
          <br />
          The contest consists of a competition among master-level university
          students from all over the world to promote and encourage software
          engineering in universities by concretely emphasizing engineering
          aspects related to software development.{" "}
        </div>
        <div className={cs("about-title", className)}>The customers</div>
        <div className={cs("about-description", className)}>
          Smarticle is a project sponsored by:
          <ul>
            <li>Xiaofei Xie - Singapore Management University, Singapore</li>
            <li>Yuekang Li - Nanyang Technological University, Singapore</li>
            <li>Yun Tang - Nanyang Technological University, Singapore</li>
          </ul>
        </div>
        <div className={cs("about-title", className)}>The team</div>
        <div className={cs("about-description", className)}>
          <ul>
            <li>
              Nika Medić - University of Zagreb, Faculty of Electrical
              Engineering and Computing
            </li>
            <li>
              Dario Novinc - University of Zagreb, Faculty of Electrical
              Engineering and Computing
            </li>
            <li>
              Ivan Vlahov - University of Zagreb, Faculty of Electrical
              Engineering and Computing
            </li>
            <li>
              Noemi Huang - Politecnico di Milano, Information Engineering
              School
            </li>
            <li>
              Sanjay Shivakumar Manohar - Politecnico di Milano, Information
              Engineering School
            </li>
            <li>
              Sairaghav Venkataraman - Politecnico di Milano, Information
              Engineering School
            </li>
          </ul>
        </div>
        <div className={cs("about-title", className)}>The supervisors</div>
        <div className={cs("about-description", className)}>
          <ul>
            <li>
              Ivana Bosnić - University of Zagreb, Faculty of Electrical
              Engineering and Computing
            </li>
            <li>
              Giancarlo Sorrentino - Politecnico di Milano, Information
              Engineering School
            </li>
          </ul>
        </div>
      </div>
      <Icons.AboutBackgroundCircles
        className={cs("about-background-circles", className)}
      />
    </div>
  );
};

export default AboutPage;
