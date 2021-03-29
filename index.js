import { Platform, NativeModules } from "react-native";
import pkg from "./package.json";

const DEFAULT_ENDPOINT = "https://check-version.flexible.agency";
const DEFAULT_COUNTRY = "us";
const CACHE = {}; // In-memory temporary cache

// noinspection JSUnusedGlobalSymbols
export const checkVersion = async(options = {}) => {
  // Get options object
  const endpoint = options.endpoint || DEFAULT_ENDPOINT;
  const platform = options.platform || Platform.OS;
  const country = options.country || DEFAULT_COUNTRY;
  const bundleId = options.bundleId || (NativeModules.RNDeviceInfo
    ? NativeModules.RNDeviceInfo.bundleId
    : null);
  const currentVersion = options.currentVersion || (NativeModules.RNDeviceInfo
    ? NativeModules.RNDeviceInfo.appVersion
    : "");

  // Check if we have retrieved a bundle ID
  if (!bundleId && !("RNDeviceInfo" in NativeModules)) {
    throw Error(
      "[react-native-check-version] Missing react-native-device-info dependency, " +
      "please manually specify a bundleId in the options object."
    );
  }

  // Compile into URL
  const url = `${endpoint}/${platform}/${bundleId}/${currentVersion}?country=${country}`;
  if (CACHE[url]) {
    return CACHE[url];
  }

  // Do the actual request
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-Source": `${pkg.name}@${pkg.version}`,
    },
  });
  const data = await response.json();
  CACHE[url] = data;

  return data;
};
