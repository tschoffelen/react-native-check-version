import axios from 'axios';
import dateFns from 'date-fns';

const cache = {};

const getTokenValue = (startToken, endToken, tokenSearchData) => {
	const indexStart = tokenSearchData.indexOf(startToken);
	let value = tokenSearchData.substring(indexStart + startToken.length);
	const indexEnd = value.indexOf(endToken);
	value = value
		.substring(0, indexEnd)
		.replace(/<[^>]+>/g, '')
		.trim();

	return value;
};

export const lookupVersion = async(platform, bundleId, country = 'us') => {
	const key = `${platform}.${bundleId}`;
	let res = cache[key];
	if (res) {
		return res;
	}

	let url;
	switch (platform) {
	case 'ios':
		// Adds a random number to the end of the URL to prevent caching
		url = `https://itunes.apple.com/lookup?lang=en&bundleId=${bundleId}&country=${country}&_=${new Date().valueOf()}`;
		res = await axios.get(url);
		if (!res.data || !('results' in res.data)) {
			throw new Error('Unknown error connecting to iTunes.');
		}
		if (!res.data.results.length) {
			throw new Error('App for this bundle ID not found.');
		}
		res = res.data.results[0];

		res = {
			version: res.version || null,
			released: res.currentVersionReleaseDate || res.releaseDate || null,
			notes: res.releaseNotes || '',
			url: res.trackViewUrl || res.artistViewUrl || res.sellerUrl || null,
			country,
			lastChecked: (new Date()).toISOString()
		};

		cache[key] = res;
		return res;
	case 'android':
		url = `https://apkcombo.com/x/${bundleId}/`;
		try {
			res = await axios.get(url, {
				headers: {
					'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36'
				}
			});
		} catch (e) {
			console.log(e.response);
			if (e.response && e.response.status && e.response.status === 404) {
				throw new Error(
					`App with bundle ID "${bundleId}" not found in Google Play.`
				);
			}
			throw e;
		}

		let resData = res.data;
		resData = resData.split('class="information-table">', 2)[1] || '';

		// Version
		const version = (getTokenValue('Version', 'Update', resData) || '').split(' (')[0];

		// Release Date
		let released = null;
		try {
			released = dateFns.parse(getTokenValue('Update', 'Developer', resData), 'LLLL d, yyyy', new Date());
		} catch (e) {
		}

		res = {
			version: version || null,
			releasedAt: (released && (released).toISOString()) || (new Date()).toISOString(),
			notes: '',
			url: `https://play.google.com/store/apps/details?id=${bundleId}`,
			lastChecked: (new Date()).toISOString()
		};

		cache[key] = res;
		return res;
	default:
		throw new Error('Unsupported platform defined.');
	}
};
