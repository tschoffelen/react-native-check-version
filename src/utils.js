import { getIosVersion } from "./providers/ios";
import { getAndroidVersion } from "./providers/android";

export const lookupVersion = async(platform, bundleId, country = "us") => {
  switch (platform) {
  case "ios":
    return getIosVersion(bundleId, country);
  case "android":
    return getAndroidVersion(bundleId, country);
  default:
    throw new Error("Unsupported platform defined.");
  }
};
