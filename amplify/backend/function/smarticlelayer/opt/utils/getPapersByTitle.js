const makeHTTPRequest = require("/opt/utils/makeHttpRequest");

async function getPapersByTitle({ paperTitle, fieldsToGet, limit }) {
  console.log("Input to getPapersByTitle", paperTitle, fieldsToGet, limit);
  let endpoint = "search";
  try {
    if (paperTitle && fieldsToGet) {
      const { status, data } = await makeHTTPRequest({
        endpoint,
        query: paperTitle,
        fields: fieldsToGet,
        limit,
      });
      if (status) {
        return {
          status: true,
          data: data.data,
        };
      } else {
        return {
          status: false,
          data,
        };
      }
    }
  } catch (error) {
    return {
      status: false,
      data: error,
    };
  }
}

module.exports = getPapersByTitle;
