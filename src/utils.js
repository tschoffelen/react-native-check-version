import { getIosVersion } from "./providers/ios";
import { getAndroidVersion } from "./providers/android";

export const lookupVersion = async(platform, bundleId, country = "us") => {
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

  return res;
};
