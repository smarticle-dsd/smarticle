const makeSemanticScholarRequest = require("/opt/utils/makeSemanticScholarRequest");

async function getPapersByTitle({ paperTitle, fieldsToGet, limit }) {
  console.log("Input to getPapersByTitle", paperTitle, fieldsToGet, limit);
  let endpoint = "search";
  try {
    if (paperTitle && fieldsToGet) {
      const { status, data } = await makeSemanticScholarRequest({
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
