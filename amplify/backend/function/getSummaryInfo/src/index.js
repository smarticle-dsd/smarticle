/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["SC_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const axios = require("axios");
const aws = require('aws-sdk');

async function getPaperId(paperTitle, key) {
    return await axios.get(`https://api.semanticscholar.org/graph/v1/paper/search`, {
      headers: {
        "x-api-key": key,
      },
      params: {
        query: paperTitle,
        limit: 1,
        fields: "authors",
      },
    });
}

async function getPaperDetails(paperId, key) {
    return await axios.get(`https://api.semanticscholar.org/graph/v1/paper/` + paperId, {
      params: {
        fields: "abstract,tldr",
      },
      headers: {
        "x-api-key": key,
      },
    }); 
}
exports.handler = async (event) => {
  const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["SC_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();
  
  let ss_key = Parameters[0].Value;
  console.log(`EVENT: ${JSON.stringify(event)}`);

  if (ss_key) {
    const paperDetails = await getPaperId(JSON.parse(event.body).paperTitle, ss_key);
    const paperId = await getPaperDetails(paperDetails.data.data[0].paperId, ss_key);
    console.log(paperId.data);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify(paperId.data),
    };
  }
  else {
    return {
      statusCode: 500,
  //  Uncomment below to enable CORS requests
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
      }, 
      body: "some error",
  };
  }
};
