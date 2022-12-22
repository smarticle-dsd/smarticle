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
    const summaryDetails = await getPaperInfo({
      paperId,
      paperTitle,
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
  } catch (error) {
    console.log(error);
    return await getReturnMessages({
      messageContent: {
        error,
      },
    });
  }
};
