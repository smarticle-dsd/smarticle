const axios = require("axios");
const getApiKey = require("/opt/utils/getApiKey");

async function makeHTTPRequest({ endpoint, query, fields, limit }) {
  console.log("Input to makeHTTPRequest", endpoint, query, fields, limit);
  const baseUrl = "https://api.semanticscholar.org/graph/v1/paper/";
  try {
    const { status, data } = await getApiKey();
    if (status && data) {
      let options = {
        method: "GET",
        url: baseUrl + endpoint,
        headers: {
          "x-api-key": data,
        },
        params: {
          query,
          fields,
          limit,
        },
      };

      const result = await axios.request(options);
      console.log("Semantic Scholar Result", result);

      return {
        status: true,
        data: result.data,
      };
    } else {
      return {
        status: false,
        data,
      };
    }
  } catch (error) {
    return {
      status: false,
      data: error,
    };
  }
}

module.exports = makeHTTPRequest;
