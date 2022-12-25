import React, { useMemo, FC } from "react";
import cs from "classnames";

import { SupportedPaperListProps } from "./SupportedPaperList.types";

const SupportedPaperList: FC<SupportedPaperListProps> = ({
  domID = "supported-paper-list",
  dataTestId = "test-supported-paper-list",
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

  const supportedInformation: Array<Record<string, string>> = [
    {
      name: "S2 ID",
      format: "paperId",
      sample: "649def34f8be52c8b66281af98ae884c09aef38b",
    },
    {
      name: "DOI ID",
      format: "paperId",
      sample: "10.1038/nrn3241",
    },
    {
      name: "arxiv ID",
      format: "arxiv:paperId",
      sample: "arxiv:2211.14292",
    },
    {
      name: "ACL ID",
      format: "ACL:paperId",
      sample: "ACL:W12-3903",
    },
    {
      name: "PubMed ID",
      format: "PubMed:paperId",
      sample: "PMID:19872477",
    },
    {
      name: "Corpus ID",
      format: "CorpusID:paperId",
      sample: "CorpusID:37220927",
    },
  ];

  const listItems = supportedInformation.map((provider, index) => {
    return (
      <div key={index}>
        <li>
          {provider.name}: {provider.format}
        </li>
        <h3>{provider.sample}</h3>
      </div>
    );
  });

  return (
    <div
      id={domIDs.root}
      className={cs("sa-supported-paper-list", className)}
      data-testid={dataTestIDs.root}
    >
      <div className={cs("sa-supported-paper-message", className)}>
        <h3>Supported ID formats and examples:</h3>
        <ul>{listItems}</ul>
      </div>
      <div className={cs("sa-supported-paper-footer", className)}>
        <h2>
          All the information displayed are provided by{" "}
          <a
            href="https://www.semanticscholar.org/"
            target="_blank"
            rel="noreferrer"
          >
            Semantic Scholar
          </a>
        </h2>
      </div>
    </div>
  );
};

export default SupportedPaperList;
