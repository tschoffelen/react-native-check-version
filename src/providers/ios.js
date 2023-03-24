export const getIosVersion = async (bundleId, country) => {
  // Adds a random number to the end of the URL to prevent caching
  const url = `https://itunes.apple.com/lookup?lang=en&bundleId=${bundleId}&country=${country}&_=${new Date().valueOf()}`;

  let res = await fetch(url);

  const data = await res.json();

  if (!data || !("results" in data)) {
    throw new Error("Unknown error connecting to iTunes.");
  }
  if (!data.results.length) {
    throw new Error("App for this bundle ID not found.");
  }

  res = data.results[0];

  return {
    version: res.version || null,
    released: res.currentVersionReleaseDate || res.releaseDate || null,
    notes: res.releaseNotes || "",
    url: res.trackViewUrl || res.artistViewUrl || res.sellerUrl || null,
    country,
    lastChecked: (new Date()).toISOString()
  };
};
