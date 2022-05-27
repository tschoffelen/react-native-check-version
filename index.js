import { Platform, NativeModules } from 'react-native';

import { lookupVersion } from './src/utils';
import { versionCompare } from './src/versions';

const DEFAULT_COUNTRY = 'us';

export const checkVersion = async(options = {}) => {
	// Get options object
	const platform = options.platform || Platform.OS;
	const country = options.country || DEFAULT_COUNTRY;
	const bundleId = options.bundleId || (NativeModules.RNDeviceInfo
		? NativeModules.RNDeviceInfo.bundleId
		: null);
	const currentVersion = options.currentVersion || (NativeModules.RNDeviceInfo
		? NativeModules.RNDeviceInfo.appVersion
		: '');

	// Check if we have retrieved a bundle ID
	if (!bundleId && !('RNDeviceInfo' in NativeModules)) {
		throw Error(
			'[react-native-check-version] Missing react-native-device-info dependency, ' +
			'please manually specify a bundleId in the options object.'
		);
	}

	const data = await lookupVersion(platform, bundleId, country);
	const version = versionCompare(currentVersion, data.version);
	return { platform, bundleId, ...data, ...version };
};
