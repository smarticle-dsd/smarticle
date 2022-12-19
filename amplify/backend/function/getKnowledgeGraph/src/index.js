/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const getPapersByTitle = require("/opt/utils/getPapersByTitle");
const querySemanticScholarByPaperId = require("/opt/utils/querySemanticScholarByPaperId");

async function getReturnMessages({ messageContent }) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  };
  const returnMessage = {
    statusCode: 200,
    headers,
    body: JSON.stringify(messageContent),
  };
  return returnMessage;
}
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const input = JSON.parse(event.body);

  let paperId = input.paperId;
  let paperTitle = input.paperTitle;

  try {
    if (paperId === null && paperTitle !== null) {
      const paperDetails = await getPapersByTitle({
        paperTitle,
        fieldsToGet: "paperId,title,authors",
        limit: 1,
      });
      console.log("Paper details", paperDetails);
      if (paperDetails.data.length > 0) paperId = paperDetails.data[0].paperId;
    }
    if (paperId !== null) {
      const paperInfo = await querySemanticScholarByPaperId({
        paperId,
        fieldsToGet:
          "title,authors,references,references.authors,citations,citations.authors,referenceCount,citationCount",
      });

      let nodesAndEdges = [];
      // Number of papers referenced in this paper.
      let referenceCount = paperInfo.data.referenceCount;

      // Number of papers which cite this paper.
      let citationCount = paperInfo.data.citationCount;

      // Number of vertices in the adjacency matrix, 1 is added for current paper
      let verticesCount = referenceCount + citationCount + 1;
      nodesAndEdges.push({
        data: {
          id: paperInfo.data.paperId,
          label: paperInfo.data.title,
          type: "main",
        },
      });

      // Adds a node for each referenced paper and sets up the
      // edges from current paper to all papers it references
      for (i = 1; i < referenceCount + 1; i++) {
        let reference = paperInfo.data.references[i - 1];
        nodesAndEdges.push({
          data: {
            id: reference.paperId,
            label: reference.title,
            type: "reference",
          },
        });
        nodesAndEdges.push({
          data: {
            source: paperInfo.data.paperId,
            target: reference.paperId,
            label: "Edge label placeholder",
            type: "reference",
          },
        });
      }

      // Adds a node for each citation and sets up the
      // edges from papers which cite this paper to the current paper
      for (i = referenceCount + 1; i < verticesCount; i++) {
        let citation = paperInfo.data.citations[i - referenceCount - 1];
        nodesAndEdges.push({
          data: {
            id: citation.paperId,
            label: citation.title,
            type: "citation",
          },
        });
        nodesAndEdges.push({
          data: {
            source: paperInfo.data.paperId,
            target: citation.paperId,
            label: "Edge label placeholder",
            type: "citation",
          },
        });
      }

      return getReturnMessages({
        messageContent: nodesAndEdges,
      });
    }
  } catch {
    return getReturnMessages({
      messageContent: {
        error: "Failed when search for paper details",
      },
    });
  }
};
