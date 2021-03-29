const lookupVersion = require("../lib/utils");

module.exports.handler = async({ pathParameters: { platform, bundleId }, queryStringParameters }) => {
  try {
    const country = queryStringParameters && queryStringParameters.country || 'us';
    const data = await lookupVersion(platform, bundleId, country);
    return {
      statusCode: 200,
      body: JSON.stringify({ platform, bundleId, ...data })
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: e.message || e })
    };
  }
};
