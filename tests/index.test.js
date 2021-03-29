import fetch from "node-fetch";

import { checkVersion } from "../index";

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

describe('checkVersion', () => {
  test('can get version for valid bundle ID', async() => {
    const data = await checkVersion({
      platform: 'android',
      bundleId: 'com.streetartcities.map',
      currentVersion: '1.0.0'
    });

    expect(data.platform).toEqual('android');
    expect(data.bundleId).toEqual('com.streetartcities.map');
    expect(data.needsUpdate).toEqual(true);
  });

  test('will not update when version is "Varies with device"', async() => {
    const data = await checkVersion({
      platform: 'android',
      bundleId: 'com.facebook.katana',
      currentVersion: '1.0.0'
    });

    expect(data.platform).toEqual('android');
    expect(data.bundleId).toEqual('com.facebook.katana');
    expect(data.needsUpdate).toEqual(false);
  });
});
