# Version checker webservice

Simple web service to help the react-native-check-version package.

## Endpoints

### `GET /:platform/:bundleId`

Get the latest version information for a specific package on a specific platform.

#### Parameters

Supported values for `:platform`:

- `android`
- `ios`

Bundle ID should be the Bundle Identifier of your app (e.g. `com.includable.example`).

#### Response format

```js
{
    "platform": "ios",
    "bundleId": "com.includable.example",
    "version": "1.2.2",
    "released": "2018-09-18T15:05:23Z",
    "notes": "This new version...",
    "url": "https://itunes.apple.com/us/app/..."
}
```

### `GET /:platform/:country/:bundleId/:currentVersion`

Compare a current `semver` version number to the latest version of the bundle.

### Parameters

See above.

### Response format

```js
{
    "platform": "ios",
    "bundleId": "com.includable.example",
    "version": "1.2.2",
    "released": "2018-09-18T15:05:23Z",
    "notes": "This new version...",
    "url": "https://itunes.apple.com/us/app/...",
    "needsUpdate": true,
    "updateType ": "minor" // or 'major', 'patch'
}
```
