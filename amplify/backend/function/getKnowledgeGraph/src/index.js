/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const getPaperInfo = require("/opt/utils/getPaperInfo");
const getReturnMessages = require("/opt/utils/getReturnMessages");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let input = {};
  try {
    input = JSON.parse(event.body);
  } catch {
    input = event;
  }

  let paperId = input.paperId;
  let paperTitle = input.paperTitle;

  try {
    const paperInfo = await getPaperInfo({
      paperId,
      paperTitle,
      fieldsToGet:
        "title,authors,references,references.title,references.authors,citations,citations.title,citations.authors,referenceCount,citationCount",
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

    return await getReturnMessages({
      messageContent: nodesAndEdges,
    });
  } catch {
    return await getReturnMessages({
      messageContent: {
        error: "Failed when search for paper details",
      },
    });
  }
};
