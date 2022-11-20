/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const axios = require('axios');
    return await axios.get(`https://api.semanticscholar.org/graph/v1/paper/` + event.paperId, {
        params: {
            fields: 'authors,citations,citationCount,references,referenceCount,title',
        },
        headers: {
            'x-api-key': process.env.SC_API_KEY,
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
        let matrix = new Array(verticesCount).fill(0).map(() => new Array(verticesCount).fill(null));

        // Sets up the directed connections from current paper to all papers it references
        for (i = 1; i < referenceCount + 1; i++){
            matrix[0][i] = paperInfo.data.references[i - 1];
        }

        // Sets up the directed connections from papers which cite this paper to the current paper
        for (i = referenceCount + 1; i < verticesCount; i++){
            matrix[i][0] = paperInfo.data.citations[i - referenceCount - 1];
        }

        console.log(matrix);
    })
    .catch(function (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: "Failed when searching for paper with ID: " + event.paperId
        }
    });
};
