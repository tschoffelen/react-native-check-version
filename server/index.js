const express = require('express')
const semver = require('semver')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 80

const lookupVersion = async (platform, bundleId) => {
  let url
  let res
  switch (platform) {
    case 'ios':
      url = `http://itunes.apple.com/lookup?lang=en&bundleId=${bundleId}`
      res = await axios.get(url)
      if (!res.data || !('results' in res.data)) {
        throw new Error('Unknown error connecting to iTunes.')
      }
      if (!res.data.results.length) {
        throw new Error('App for this bundle ID not found.')
      }
      res = res.data.results[0]
      return {
        version: res.version || null,
        released: res.currentVersionReleaseDate || res.releaseDate || null,
        notes: res.releaseNotes || '',
        url: res.trackViewUrl || res.artistViewUrl || res.sellerUrl || null
      }
    case 'android':
      url = `https://play.google.com/store/apps/details?id=${bundleId}&hl=en`
      res = await axios.get(url)
      res = res.data

      let startToken = 'Current Version</div><span class="htlgb"><div><span class="htlgb">'

      let indexStart = res.indexOf(startToken)
      let startTokenLength = startToken.length
      res = res.substr(indexStart + startTokenLength)
      res = res.substr(0, res.indexOf('<')).trim()
      return {
        version: res || null,
        released: new Date(),
        notes: '',
        url: `https://play.google.com/store/apps/details?id=${bundleId}`
      }
    default:
      throw new Error('Unsupported platform defined.')
  }
}

app.get('/', (req, res) => res.send('hi!'))
app.get('/health', (req, res) => res.send('hi!'))
app.get('/ping', (req, res) => res.send('hi!'))

app.get('/:platform/:bundleId', async (req, res) => {
  try {
    const data = await lookupVersion(req.params.platform, req.params.bundleId)
    res.json(Object.assign({}, req.params, data))
  } catch (e) {
    res.json({error: e.message || e})
  }
})

app.get('/:platform/:bundleId/:currentVersion', async (req, res) => {
  try {
    const data = await lookupVersion(req.params.platform, req.params.bundleId)

    const needsUpdate = semver.lt(req.params.currentVersion, data.version)
    const updateType = needsUpdate ? semver.diff(req.params.currentVersion, data.version) : null
    res.json(Object.assign({}, req.params, data, {needsUpdate, updateType}))
  } catch (e) {
    res.json({error: e.message || e})
  }
})

app.listen(port, () => console.log(`Version service listening on port ${port}`))
