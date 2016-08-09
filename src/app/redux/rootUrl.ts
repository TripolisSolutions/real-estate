let root

if (process.env.BROWSER) {
  root = '/api'
} else {
  root = require('nconf').get('SETTINGS_REAL_ESTATE_API')
}

export default root
