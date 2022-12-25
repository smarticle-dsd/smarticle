/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const queryNlpCloud = require("/opt/utils/makeNlpCloudRequest");
const getReturnMessages = require("/opt/utils/getReturnMessages");
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let input = {};
  try {
    input = JSON.parse(event.body);
  } catch {
    input = event;
  }

  try {
    const customSummary = await queryNlpCloud({
      text: input.text,
    });

    return await getReturnMessages({
      messageContent: {
        summary: customSummary.data,
      },
    });
  } catch {
    return await getReturnMessages({
      messageContent: {
        error:
          "Internal error. The request is too long or you have exceeded the number of allowed requests.",
      },
    });
  }
};
