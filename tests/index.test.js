import { checkVersion } from "../index";

global.fetch = jest.requireActual('node-fetch')

describe("checkVersion", () => {
  test("can get version for valid bundle ID for Android", async () => {
    const data = await checkVersion({
      platform: "android",
      bundleId: "com.streetartcities.map",
      currentVersion: "1.0.0"
    });

    expect(data.platform).toEqual("android");
    expect(data.bundleId).toEqual("com.streetartcities.map");
    expect(data.needsUpdate).toEqual(true);
  });

  test("can get version for unknown bundle ID for Android with error property", async () => {
    const data = await checkVersion({
      platform: "android",
      bundleId: "com.notarealapp.unknown",
      currentVersion: "1.0.0"
    });

    expect(data.platform).toEqual("android");
    expect(data.bundleId).toEqual("com.notarealapp.unknown");
    expect(data.error.toString()).toEqual('Error: App with bundle ID "com.notarealapp.unknown" not found in Google Play.');
  });


  test("can get version for valid bundle ID for iOS", async () => {
    const data = await checkVersion({
      platform: "ios",
      bundleId: "nl.hoyapp.mobile",
      currentVersion: "1.0.0"
    });

    expect(data.platform).toEqual("ios");
    expect(data.bundleId).toEqual("nl.hoyapp.mobile");
    expect(data.needsUpdate).toEqual(true);
  });

  test("can get version for unknown bundle ID for iOS with error property", async () => {
    const data = await checkVersion({
      platform: "ios",
      bundleId: "com.notarealapp.unknown",
      currentVersion: "1.0.0"
    });

    expect(data.platform).toEqual("ios");
    expect(data.bundleId).toEqual("com.notarealapp.unknown");
    expect(data.error.toString()).toEqual("Error: App for this bundle ID not found.");
  });
});
