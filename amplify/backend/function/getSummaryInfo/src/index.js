/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const getPapersByTitle = require("/opt/utils/getPapersByTitle");
const querySemanticScholarByPaperId = require("/opt/utils/querySemanticScholarByPaperId");

async function getReturnMessages({ statusCode, messageContent }) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  };
  const returnMessage = {
    statusCode,
    headers,
    body: JSON.stringify(messageContent),
  };
  return returnMessage;
}

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const input = JSON.parse(event.body);

  let paperId = input.paperId;

  try {
    if (!paperId) {
      const paperDetails = await getPapersByTitle({
        paperTitle: input.paperTitle,
        fieldsToGet: "paperId,title,authors",
        limit: 1,
      });
      console.log("Paper details", paperDetails);
      paperId = paperDetails.data[0].paperId;
    }
    if (paperId) {
      const summaryDetails = await querySemanticScholarByPaperId({
        paperId,
        fieldsToGet: "abstract,tldr",
      });
      return await getReturnMessages({
        statusCode: 200,
        messageContent: {
          abstract: summaryDetails.data.abstract,
          tldr: summaryDetails.data.tldr.text,
        },
      });
    } else {
      return await getReturnMessages({
        statusCode: 500,
        messageContent: {
          error: "Cannot find the paper ID",
        },
      });
    }
  } catch (error) {
    console.log(error);
    return await getReturnMessages({
      statusCode: 500,
      messageContent: {
        error,
      },
    });
  }
};
