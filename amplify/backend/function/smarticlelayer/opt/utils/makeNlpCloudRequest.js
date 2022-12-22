const axios = require("axios");
const getApiKey = require("/opt/utils/getApiKey");

async function makeNlpCloudRequest({ text }) {
  console.log("Input to makeNlpCloudRequest", text);
  const baseUrl = "https://api.nlpcloud.io/v1/bart-large-cnn/summarization";
  try {
    const { status, data } = await getApiKey("NC_KEY");
    if (status && data) {
      let options = {
        method: "POST",
        url: baseUrl,
        headers: {
          Authorization: "Token " + data,
          "Content-Type": "application/json",
        },
        data: {
          text,
        },
      };

      const result = await axios.request(options);
      console.log("NLP Cloud Result", result);

      return {
        status: true,
        data: result.data.summary_text,
      };
    } else {
      return {
        status: false,
        data: "Internal error. The request is too long or you have exceeded the number of allowed requests.",
      };
    }
  } catch (error) {
    return {
      status: false,
      data: "Internal error. The request is too long or you have exceeded the number of allowed requests.",
    };
  }
}

module.exports = makeNlpCloudRequest;
