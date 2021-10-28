const axios = require("axios");
const dateFns = require('date-fns');

const cache = {}

const getTokenValue = (startToken, endToken, tokenSearchData) => {
  const indexStart = tokenSearchData.indexOf(startToken);
  let value = tokenSearchData.substr(indexStart + startToken.length);
  const indexEnd = value.indexOf(endToken);
  value = value
    .substr(0, indexEnd)
    .replace(/<[^>]+>/g, "")
    .trim();

  return value;
}

const lookupVersion = async(platform, bundleId, country = 'us') => {
  const key = `${platform}.${bundleId}`;
  let res = cache[key];
  if (res) {
    return res;
  }

  let url;
  switch (platform) {
  case "ios":
    url = `http://itunes.apple.com/lookup?lang=en&bundleId=${bundleId}&country=${country}`;
    res = await axios.get(url);
    if (!res.data || !("results" in res.data)) {
      throw new Error("Unknown error connecting to iTunes.");
    }
    if (!res.data.results.length) {
      throw new Error("App for this bundle ID not found.");
    }
    res = res.data.results[0];

    res = {
      version: res.version || null,
      released: res.currentVersionReleaseDate || res.releaseDate || null,
      notes: res.releaseNotes || "",
      url: res.trackViewUrl || res.artistViewUrl || res.sellerUrl || null,
      country,
      lastChecked: (new Date()).toISOString()
    };

    cache[key] = res;
    return res;
  case "android":
    url = `https://play.google.com/store/apps/details?id=${bundleId}&hl=en`;
    try {
      res = await axios.get(url);
    } catch (e) {
      if (e.response && e.response.status && e.response.status === 404) {
        throw new Error(
          `App with bundle ID "${bundleId}" not found in Google Play.`
        );
      }
      throw e;
    }

    const resData = res.data;

    // Version
    const version = getTokenValue("Current Version", "Requires", resData)

    // Release Date
    const released = dateFns.parse(getTokenValue("Updated", "Size", resData), 'LLLL d, yyyy', new Date());


    res = {
      version: version || null,
      released: (released).toISOString(),
      notes: "",
      url: `https://play.google.com/store/apps/details?id=${bundleId}`,
      lastChecked: (new Date()).toISOString()
    };

    cache[key] = res;
    return res;
  default:
    throw new Error("Unsupported platform defined.");
  }
};

module.exports = lookupVersion;
