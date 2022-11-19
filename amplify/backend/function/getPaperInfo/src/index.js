/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const axios = require('axios');
  const url = require('node:url');

  // TODO: Implement pagination
  return await axios.get(`https://api.semanticscholar.org/graph/v1/paper/search`, {
        params: {
          query: event.paperTitle,
          limit: 100,
          fields: 'authors',
        },
        headers: {
            'x-api-key': process.env.SC_API_KEY,
        },
      })
  .then(async function (res) {
    if (res.Total == 0){
      return {
        statusCode: 404,
        body: 'Found no papers relating to the title.',
      };
    }

    if (res.data.total > 1)
		{
      let foundSinglePaper = false;

      // Try to find the right paper by searching through the last names of the authors of each paper.
      // If exactly one paper is found, the flag is set.
      if (!ArrayIsNullOrEmpty(event.authorsLastNames)){
        foundSinglePaper = res.data.data
          .filter(o => o.authors
            .includes(author => event.authorsLastNames
              .includes(ExtractLastName(author.name)))) == 1;

        if (foundSinglePaper){
          // We've found our paper, new Data is then created to extract the proper ID in the getPaperInfoRequest
          res.data.data = res.data.data
            .filter(o => o.authors
              .includes(author => event.authorsLastNames
                .includes(ExtractLastName(author.name))))
        }
      }

      // If no authors were provided in the request or the title was not found
      if (ArrayIsNullOrEmpty(event.authorsLastNames) || !foundSinglePaper){
        return {
          statusCode: 400,
          body: 'Semantic Scholar API returned multiple papers when searching the title.',
        };
      }
    }

    return await axios.get(`https://api.semanticscholar.org/graph/v1/paper/` + res.data.data[0].paperId, {
      params: {
        fields: 'url,title,abstract,year,authors,tldr',
      },
      headers: {
          'x-api-key': process.env.SC_API_KEY,
      },
    })
    .then(function (paperInfo) {
      return {
        statusCode: 200,
        body: 
        {
          title: paperInfo.data.title,
          abstract: paperInfo.data.abstract,
          authors: paperInfo.data.authors,
          paperId: paperInfo.data.paperId,
          tldr: paperInfo.data.tldr,
          url: paperInfo.data.url,
          year: paperInfo.data.year
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
};

function ArrayIsNullOrEmpty(array){
  return array == null || array.length == 0;
}

function ExtractLastName(name){
  var splitName = name.split(/\s+/);

  if (splitName.length < 2)
    return name;

  return splitName[splitName.length - 1];
}
