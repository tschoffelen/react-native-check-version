import { Platform, NativeModules } from 'react-native'
import pkg from './package.json'

const DEFAULT_ENDPOINT = 'https://versionservice.now.sh'

export const checkVersion = (options = {}) => {
  return new Promise((resolve, reject) => {
    // Get options object
    const defaultOptions = {
      endpoint: DEFAULT_ENDPOINT,
      platform: Platform.OS,
      bundleId: NativeModules.RNDeviceInfo ? NativeModules.RNDeviceInfo.bundleId : null,
      currentVersion: NativeModules.RNDeviceInfo ? NativeModules.RNDeviceInfo.appVersion : ''
    }
    options = Object.assign({}, defaultOptions, options)

    // Check if we have retrieved a bundle ID
    if (!options.bundleId && !('RNDeviceInfo' in NativeModules)) {
      return console.error(
        '[react-native-check-version] Missing react-native-device-info dependency, ' +
        'please manually specify a bundleId in the options object.'
      )
    }

    // Compile into URL
    const url = `${options.endpoint}/${options.platform}/${options.bundleId}/${options.currentVersion}`

    // Do the actual request
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Source': `${pkg.name}@${pkg.version}`
      }
    })
      .then((response) => {
        return response.json()
          .then((body) => resolve(body))
          .catch((err) => reject(err))
      })
      .catch((err) => reject(err))
  })
}
