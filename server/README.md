# Version checker webservice

Simple web service to help the react-native-check-version package.

## Usage

Both of these methods will expose the web service on local port 3000:

### Docker

```bash
docker build -t version-service .
docker run -it -p 3000:80 version-service:latest
```

### Manually

```bash
npm i
PORT=3000 npm start
```


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

### `GET /:platform/:bundleId/:currentVersion`

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

## Notes

* Caching: the server caches values in-memory for a maximum of 12 hours


## Development

The following will start a `nodemon`-run instance on port 3000:

```
npm i
npm run dev
```
