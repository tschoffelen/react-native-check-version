export const getAndroidVersion = async (bundleId, country) => {
  const url = `https://play.google.com/store/apps/details?id=${bundleId}&hl=${country}`;
  let res;
  try {
    res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36",
        'sec-fetch-site': 'same-origin'
      }
    });
  } catch (e) {
    throw e;
  }

  if (!res.ok) {

    if (res.status === 404) {
      throw new Error(
        `App with bundle ID "${bundleId}" not found in Google Play.`
      );
    }
    throw res.statusText
  }

  const text = await res.text();
  const version = text.match(/\[\[\[['"]((\d+\.)+\d+)['"]\]\],/)[1];

  return {
    version: version || null,
    releasedAt: (new Date()).toISOString(),
    notes: "",
    url: `https://play.google.com/store/apps/details?id=${bundleId}&hl=${country}`,
    lastChecked: (new Date()).toISOString()
  };
};
