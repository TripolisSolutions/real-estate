export interface IConfig {
  googleMapAPIKey: string
  googleAnalyticsAPIKey: string
  imageRootUrl: string
}

let configs: () => IConfig

if (process.env.BROWSER) {
  configs = () => ({
    googleMapAPIKey: window.__CONFIG__.googleMapAPIKey,
    googleAnalyticsAPIKey: window.__CONFIG__.googleAnalyticsAPIKey,
    imageRootUrl: window.__CONFIG__.imageRootUrl,
  })
} else {
  const nconf = require('nconf')

  configs = () => ({
    googleMapAPIKey: nconf.get('SETTINGS_GOOGLE_MAP_API_KEY'),
    googleAnalyticsAPIKey: nconf.get('SETTINGS_GOOGLE_ANALYTIC_API_KEY'),
    imageRootUrl: nconf.get('SETTINGS_IMAGE_ROOT_URL'),
  })
}

export default configs
