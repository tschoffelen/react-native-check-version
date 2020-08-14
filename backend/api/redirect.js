const lookupVersion = require("../lib/utils");

module.exports.handler = async({ pathParameters: { platform, bundleId } }) => {
  try {
    const data = await lookupVersion(platform, bundleId);
    return {
      statusCode: 302,
      headers: {
        Location: data.url,
      }
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: e.message || e })
    };
  }
};
