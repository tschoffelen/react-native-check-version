const semver = require("semver");
const lookupVersion = require("../lib/utils");

const versionCompare = (currentVersion, latestVersion) => {
  if (!latestVersion) {
    return {
      needsUpdate: false,
      updateType: null,
      notice: 'Error: could not get latest version'
    };
  }

  try {
    const needsUpdate = semver.lt(currentVersion, latestVersion);
    const updateType = needsUpdate ? semver.diff(currentVersion, latestVersion) : null;
    return {
      needsUpdate,
      updateType
    };
  } catch (e) {
    const needsUpdate = currentVersion !== latestVersion;
    const updateType = needsUpdate ? 'minor' : null;
    return {
      needsUpdate,
      updateType,
      notice: e.message
    };
  }
};

module.exports.handler = async({ pathParameters: { platform, bundleId, currentVersion } }) => {
  try {
    const data = await lookupVersion(platform, bundleId);
    const version = versionCompare(currentVersion, data.version);
    return {
      statusCode: 200,
      body: JSON.stringify({ platform, bundleId, ...data, ...version })
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: e.message || e })
    };
  }
};
