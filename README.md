# React Native Check Version

[![NPM](https://img.shields.io/npm/v/react-native-check-version.svg?style=flat)](https://npmjs.com/package/react-native-check-version)
[![GitHub license](https://img.shields.io/github/license/includable/react-native-check-version.svg)](https://github.com/includable/react-native-check-version/blob/master/LICENSE)

---

An easy way to check if there's an update available for the current app in the App Store or Google Play.

Note that you need [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info) to be
installed for this library to function as expected, or you need to manually supply the `bundleId` and
`currentVersion` values in the options object.

## Installation

```
yarn add react-native-check-version react-native-device-info
```

## Basic usage

Use the `checkVersion` method to get information:

```js
import { checkVersion } from "react-native-check-version";

const version = await checkVersion();
console.log("Got version info:", version);

if (version.needsUpdate) {
   console.log(`App has a ${version.updateType} update pending.`);
}
```

## API

### Function usage

`checkVersion()` accepts an _optional_ options object, which may contain the following keys:

- string `platform`: platform to check for, defaults to React Native's `Platform.OS`
- string `country`: App Store specific country, defaults to `us`
- string `bundleId`: bundle identifier to check, defaults to the value retrieved using react-native-device-info
- string `currentVersion`: version to check against, defaults to the currently installed version

### Response object

`checkVersion()` returns a Promise, which when resolved will return an object with the following properties:

- string `version`: latest version number of the app
- string `released`: (iOS only) ISO 8601 release date of that version
- string `url`: download URL for the latest version
- string `notes`: (iOS only) release notes of latest version
- boolean `needsUpdate`: whether the latest version number is higher than the currently installed one
- string `updateType`: `major`, `minor` or `patch`, based on how big the difference is between the currently installed version and the available version

## Authors

This library is developed by Flexible Agency, a creative app development agency.

- Thomas Schoffelen, [@tschoffelen](https://twitter.com/tschoffelen)


<br /><br />

---

<div align="center">
	<b>
		<a href="https://schof.co/consulting/?utm_source=flexible-agency/react-native-check-version">Get professional support for this package →</a>
	</b>
	<br>
	<sub>
		Custom consulting sessions availabe for implementation support or feature development.
	</sub>
</div>
