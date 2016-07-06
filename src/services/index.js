// const contactRequests = require('./contact_requests')
const article = require('./article')
const authentication = require('./authentication')
const user = require('./user')
const properties = require('./properties')
// const mongoose = require('mongoose')

module.exports = function () {
  const app = this

  // mongoose.connect(app.get('mongodb'))
  // mongoose.Promise = global.Promise

  app.configure(authentication)
  app.configure(user)
  app.configure(article)
  app.configure(properties)
}
