const makeSemanticScholarRequest = require("/opt/utils/makeSemanticScholarRequest");
async function querySemanticScholarByPaperId({ paperId, fieldsToGet }) {
  console.log("Input to querySemanticScholarByPaperId", paperId, fieldsToGet);
  let endpoint = "";
  try {
    if (paperId && fieldsToGet) {
      endpoint += paperId;
      const { status, data } = await makeSemanticScholarRequest({
        endpoint,
        fields: fieldsToGet,
      });

      if (status) {
        return {
          status: true,
          data: {
            ...data,
          },
        };
      } else {
        return {
          status: false,
          data,
        };
      }
    } else {
      return {
        status: false,
        data: "Please provide paperId and fieldsToGet.",
      };
    }
  } catch (error) {
    return {
      status: false,
      data: error,
    };
  }
}

module.exports = querySemanticScholarByPaperId;
