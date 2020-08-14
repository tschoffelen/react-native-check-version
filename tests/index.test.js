import fetch from "node-fetch";

import { checkVersion } from "../index";

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

describe('checkVersion', () => {
  test('can get version for valid bundle ID', async() => {
    const data = await checkVersion({
      platform: 'android',
      bundleId: 'com.facebook.katana',
      currentVersion: '1.0.0'
    });

    expect(data.platform).toEqual('android');
    expect(data.bundleId).toEqual('com.facebook.katana');
    expect(data.needsUpdate).toEqual(true);
  });
});
