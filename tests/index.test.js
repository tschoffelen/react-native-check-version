import { checkVersion } from '../index';

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

	test('can get version for valid bundle ID', async() => {
		const data = await checkVersion({
			platform: 'ios',
			bundleId: 'nl.hoyapp.mobile',
			currentVersion: '1.0.0'
		});

		expect(data.platform).toEqual('ios');
		expect(data.bundleId).toEqual('nl.hoyapp.mobile');
		expect(data.needsUpdate).toEqual(true);
	});
});
