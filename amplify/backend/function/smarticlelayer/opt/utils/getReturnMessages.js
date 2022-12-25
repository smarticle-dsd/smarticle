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

module.exports = getReturnMessages;
