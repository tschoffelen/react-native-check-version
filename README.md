React Native Check Version

[![GitHub release](https://img.shields.io/github/release/includable/react-native-check-version.svg)](https://github.com/includable/react-native-check-version/releases)
[![GitHub license](https://img.shields.io/github/license/includable/react-native-check-version.svg)](https://github.com/includable/react-native-check-version/blob/master/LICENSE)

---

An easy way to check if there's an update available for the current app in the App Store or Google Play.

Note that you need [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info) to be
installed for this library to function as expected, or you need to manually supply the `bundleId` and
`currentVersion` values in the options object.


## Installation

```
yarn add react-native-check-version react-native-device-info
react-native link react-native-device-info
```


## Basic usage

Use the `checkVersion` method to get information:

```js
import { checkVersion } from 'react-native-check-version'

checkVersion()
    .then(version => {
        console.log('Got version info:', version)
        if (version.needsUpdate) {
            console.log(
                'App has a ' +
                (version.updateType == 'major' ? 'big' : 'small') +
                ' update pending'
            )
        }
    })
    .catch(e => {
        // Error - could not get version info for some reason
        console.log('Failed getting version info:', e)
    })
```


## API

### Function usage

`checkVersion()` accepts an _optional_ options object, which may contain the following keys:

* string `endpoint`: endpoint to use to retrieve version info, defaults to `https://versionservice.now.sh`
* string `platform`: platform to check for, defaults to React Native's `Platform.OS`
* string `bundleId`: bundle identifier to check, defaults to the value retrieved using react-native-device-info
* string `currentVersion`: version to check against, defaults to the currently installed version

### Response object

`checkVersion()` returns a Promise, which when resolved will return an object with the following properties:

* string `version`: latest version number of the app
* string `released`: (iOS only) ISO 8601 release date of that version
* string `url`: download URL for the latest version
* string `notes`: (iOS only) release notes of latest version
* boolean `needsUpdate`: whether the latest version number is higher than the currently installed one
* string `updateType`: `major`, `minor` or `patch`, based on how big the difference is between the currently installed version and the available version


## Authors

This library is developed by [Includable](https://includable.com/), a creative app and web platform
development agency based in Amsterdam, The Netherlands.

* Thomas Schoffelen, [@tschoffelen](https://twitter.com/tschoffelen)
