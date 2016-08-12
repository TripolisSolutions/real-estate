/** General Configurations Like PORT, HOST names and etc... */

var config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8999,
  karmaPort: 9876,

  // This part goes to React-Helmet for Head of our HTML
  app: {
    head: {
      title: 'D2 Real Estate',
      titleTemplate: 'D2 Real Estate: %s',
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'D2 Real Estate' },
      ]
    }
  }
}

module.exports = config
