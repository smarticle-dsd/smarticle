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
      const summaryDetails = await querySemanticScholarByPaperId({
        paperId,
        fieldsToGet: "abstract,tldr",
      });

      const abstract = summaryDetails.data.abstract;
      const tldr = summaryDetails.data.tldr
        ? summaryDetails.data.tldr.text
        : null;
      return await getReturnMessages({
        messageContent: {
          abstract,
          tldr,
        },
      });
    } else {
      return await getReturnMessages({
        messageContent: {
          error: "Cannot find the paper ID",
        },
      });
    }
  } catch (error) {
    console.log(error);
    return await getReturnMessages({
      messageContent: {
        error,
      },
    });
  }
};
