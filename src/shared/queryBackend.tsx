import { Amplify, API } from "aws-amplify";

import aws_exports from "../aws-exports";
import { getMainNode } from "./getDataForKnowledgeGraph";
Amplify.configure(aws_exports);

export const queryBackend = async (
  endpoint: string,
  data: Record<string, Record<string, string | null>>,
) => {
  return API.post("backend", endpoint, data);
};

export const getData = async (id: string | null, title: string | null) => {
  const returnValues: Record<string, Record<string, string>> = {};
  try {
    const result = await queryBackend("/paperKnowledgeGraph", {
      body: {
        paperTitle: title,
        paperId: id,
      },
    });
    const main = getMainNode(result);
    if (main?.abstract || main?.tldr) returnValues.summary = result;
    else returnValues.summary = {};
    returnValues.elements = result;

    return returnValues;
  } catch {
    return null;
  }
};
