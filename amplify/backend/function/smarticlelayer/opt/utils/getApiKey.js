const aws = require("aws-sdk");

async function getApiKey(key) {
  try {
    const { Parameters } = await new aws.SSM()
      .getParameters({
        Names: [key].map((secretName) => process.env[secretName]),
        WithDecryption: true,
      })
      .promise();

    return {
      status: true,
      data: Parameters[0].Value,
    };
  } catch (error) {
    return {
      status: false,
      data: error,
    };
  }
}

module.exports = getApiKey;
