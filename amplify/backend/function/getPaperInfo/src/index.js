/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axios = require("axios");

  // If the paperId was included, fetch the paper and return.
  if (event.body.paperId !== undefined && event.body.paperId.length > 0) {
    return await GetPaperById(event.body.paperId);
  }

  // TODO: Implement pagination
  // Search for the paper using the title provided
  return await axios
    .get(`https://api.semanticscholar.org/graph/v1/paper/search`, {
      params: {
        query: event.body.paperTitle,
        limit: 100,
        fields: "authors",
      },
      headers: {
        "x-api-key": process.env.SC_API_KEY,
      },
    })
    .then(async function (res) {
      if (res.Total === 0) {
        return {
          statusCode: 404,
          body: "Found no papers relating to the title.",
        };
      }

      // Multiple papers returned
      if (res.data.total > 1) {
        let foundSinglePaper = false;

        // Try to find the right paper by searching through the last names of the authors of each paper.
        // If exactly one paper is found, the flag is set.
        if (!ArrayIsNullOrEmpty(event.body.authorsLastNames)) {
          let papersFilteredByAuthors = FilterPapersByAuthorsLastNames(
            res.data.data,
            event.body.authorsLastNames,
          );

          if (papersFilteredByAuthors.length === 1) {
            // We've found our paper, data is then edited to extract the proper ID in the next request
            res.data.data = papersFilteredByAuthors;
            foundSinglePaper = true;
          } else {
            let papersFilteredByTitle = papersFilteredByAuthors.filter(
              (o) => o.title === event.body.paperTitle,
            );

            if (papersFilteredByTitle.length === 1) {
              res.data.data = papersFilteredByTitle;
              foundSinglePaper = true;
            }

            // TODO possibly implement filter by year
          }
        }

        // If no authors were provided in the request or the title was not found
        if (
          ArrayIsNullOrEmpty(event.body.authorsLastNames) ||
          !foundSinglePaper
        ) {
          return {
            statusCode: 400,
            body: "Semantic Scholar API returned multiple papers when searching the title.",
          };
        }
      }

      return await GetPaperById(res.data.data[0].paperId);
    })
    .catch(function () {
      return {
        statusCode: 400,
        body:
          "Failed when searching for paper with ID: " + event.body.paperTitle,
      };
    });
};

function ArrayIsNullOrEmpty(array) {
  return array === null || array.length === 0;
}

function ExtractLastName(name) {
  var splitName = name.split(/\s+/);

  if (splitName.length < 2) return name;

  return splitName[splitName.length - 1];
}

function GetPaperById(paperId) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axios = require("axios");
  return axios
    .get(`https://api.semanticscholar.org/graph/v1/paper/` + paperId, {
      params: {
        fields: "url,title,abstract,year,authors,tldr",
      },
      headers: {
        "x-api-key": process.env.SC_API_KEY,
      },
    })
    .then(function (paperInfo) {
      return {
        statusCode: 200,
        body: {
          title: paperInfo.data.title,
          abstract: paperInfo.data.abstract,
          authors: paperInfo.data.authors,
          paperId: paperInfo.data.paperId,
          tldr: paperInfo.data.tldr,
          url: paperInfo.data.url,
          year: paperInfo.data.year,
        },
      };
    })
    .catch(function () {
      return {
        statusCode: 400,
        body:
          "Failed when searching for paper with ID: " +
          res.data.data[0].paperId,
      };
    });
}

// This function filters through all the papers to only include those papers with the same authors
// as those specified in the request.
// TODO: Potentially implement that not all last names need to match (but only half for example).
function FilterPapersByAuthorsLastNames(papers, authorsLastNames) {
  return papers.filter(
    (o) =>
      o.authors.length === authorsLastNames.length && // Initial check to see if the number of authors is the same.
      o.authors.filter((author) =>
        authorsLastNames.includes(ExtractLastName(author.name)),
      ).length === o.authors.length,
  ); // Only get the papers where all the authors match.
}
