import { getMainNode } from "./getDataForKnowledgeGraph";
import { getData, queryBackend } from "./queryBackend";

// Function to call backend to get summary
export const getSummary = async (id: string | null, title: string | null) => {
  const result = await getData(id, title);
  if (result) {
    const main = getMainNode(result);
    if (main?.abstract || main?.tldr) return result;
    else return null;
  }
};

// Function to call backend to get custom summary
export const getCustomSummary = async (text: string) => {
  const result = await queryBackend("/customSummary", {
    body: {
      text,
    },
  });

  if (result.summary) return result.summary;
  else return "Summary could not be generated for the selected section.";
};
