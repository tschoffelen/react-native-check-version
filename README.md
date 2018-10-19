React Native Check Version

[![GitHub release](https://img.shields.io/github/release/includable/react-native-check-version.svg)](https://github.com/includable/react-native-check-version/releases)
[![GitHub license](https://img.shields.io/github/license/includable/react-native-check-version.svg)](https://github.com/includable/react-native-check-version/blob/master/LICENSE)

---

An easy way to check if there's an update available for the current app in the App Store or Google Play.

Note that you need [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info) to be installed for this library to function as expected.


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


## Authors

This library is developed by [Includable](https://includable.com/), a creative app and web platform
development agency based in Amsterdam, The Netherlands.

* Thomas Schoffelen, [@tschoffelen](https://twitter.com/tschoffelen)
