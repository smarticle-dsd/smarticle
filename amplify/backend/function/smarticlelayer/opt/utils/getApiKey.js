const aws = require("aws-sdk");

async function getApiKey() {
  try {
    const { Parameters } = await new aws.SSM()
      .getParameters({
        Names: ["SC_KEY"].map((secretName) => process.env[secretName]),
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
