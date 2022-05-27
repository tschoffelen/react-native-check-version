import { getIosVersion } from "./providers/ios";
import { getAndroidVersion } from "./providers/android";

const cache = {};

export const lookupVersion = async(platform, bundleId, country = "us") => {
  const key = `${platform}.${bundleId}`;
  let res = cache[key];
  if (res) {
    return res;
  }

  switch (platform) {
  case "ios":
    res = await getIosVersion(bundleId, country);
    break;
  case "android":
    res = await getAndroidVersion(bundleId, country);
    break;
  default:
    throw new Error("Unsupported platform defined.");
  }

  cache[key] = res;
  return res;
};
