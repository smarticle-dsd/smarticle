/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const axios = require("axios");
  return await axios
    .get(`https://api.semanticscholar.org/graph/v1/paper/` + event.paperId, {
      params: {
        fields:
          "authors,citations,citationCount,references,referenceCount,title",
      },
      headers: {
        "x-api-key": process.env.SC_API_KEY,
      },
    })
    .then(function (paperInfo) {
      // Number of papers referenced in this paper.
      let referenceCount = paperInfo.data.referenceCount;

      // Number of papers which cite this paper.
      let citationCount = paperInfo.data.citationCount;

      // Number of vertices in the adjacency matrix, 1 is added for current paper
      let verticesCount = referenceCount + citationCount + 1;

      // Creates N*N matrix with initial values set to 0
      let nodesAndEdges = new Array(verticesCount);

      nodesAndEdges[0] = {
        nodeData: {
          data: { id: paperInfo.data.paperId, label: paperInfo.data.title },
        },
      };

      // Sets up the directed connections from current paper to all papers it references
      for (i = 1; i < referenceCount + 1; i++) {
        let reference = paperInfo.data.references[i - 1];
        nodesAndEdges[i] = {
          nodeData: { data: { id: reference.paperId, label: reference.title } },
          edgeData: {
            data: {
              source: paperInfo.data.paperId,
              target: reference.paperId,
              label: "Edge label placeholder",
            },
          },
        };
      }

      // Sets up the directed connections from papers which cite this paper to the current paper
      for (i = referenceCount + 1; i < verticesCount; i++) {
        let reference = paperInfo.data.citations[i - referenceCount - 1];
        nodesAndEdges[i] = {
          nodeData: { data: { id: reference.paperId, label: reference.title } },
          edgeData: {
            data: {
              source: paperInfo.data.paperId,
              target: reference.paperId,
              label: "Edge label placeholder",
            },
          },
        };
      }

      return {
        statusCode: 200,
        body: nodesAndEdges,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        statusCode: 400,
        body: "Failed when searching for paper with ID: " + event.paperId,
      };
    });
};
