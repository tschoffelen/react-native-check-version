const semver = require("semver");
const lookupVersion = require("../lib/utils");

const diffLoose = (version1, version2) => {
  if (semver.eq(version1, version2, true)) {
    return null;
  }
  const v1 = semver.parse(version1, true);
  const v2 = semver.parse(version2, true);
  let prefix = "";
  let defaultResult = null;
  if (v1.prerelease.length || v2.prerelease.length) {
    prefix = "pre";
    defaultResult = "prerelease";
  }
  for (let key in v1) {
    if (v1.hasOwnProperty(key) && ["major", "minor", "patch"].includes(key) && v1[key] !== v2[key]) {
      return prefix + key;
    }
  }
  return defaultResult;
};

const versionCompare = (currentVersion, latestVersion) => {
  if (!latestVersion) {
    return {
      needsUpdate: false,
      updateType: null,
      notice: "Error: could not get latest version"
    };
  }

  try {
    const needsUpdate = semver.lt(currentVersion, latestVersion, true);
    const updateType = needsUpdate ? diffLoose(currentVersion, latestVersion) : null;
    return {
      needsUpdate,
      updateType
    };
  } catch (e) {
    let needsUpdate = currentVersion !== latestVersion && (latestVersion > currentVersion);
    if (!latestVersion.includes('.')) {
      needsUpdate = false;
    }
    const updateType = needsUpdate ? "minor" : null;
    return {
      needsUpdate,
      updateType,
      notice: e.message.replace(/^Invalid Version:/, "Not a valid semver version:")
    };
  }
};

module.exports.handler = async({ pathParameters: { platform, bundleId, currentVersion }, queryStringParameters }) => {
  try {
    const country = queryStringParameters && queryStringParameters.country || 'us';
    const data = await lookupVersion(platform, bundleId, country);
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
