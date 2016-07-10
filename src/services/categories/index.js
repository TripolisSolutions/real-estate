import request from 'request-promise'
import nconf from 'nconf'

class Service {
  constructor() {
  }

  find(params) {
    return request(`${ nconf.get('SETTINGS_REAL_ESTATE_API') }/categories`)
  }

  get(id, params) {
    return request(`${ nconf.get('SETTINGS_REAL_ESTATE_API') }/categories/${ id }`)
  }

  create(data, params) {
    return request({
      method: 'POST',
      uri: `${ nconf.get('SETTINGS_REAL_ESTATE_API') }/categories`,
      body: data,
      json: true,
    })
  }

  update(id, data, params) {
    return request({
      method: 'PUT',
      uri: `${ nconf.get('SETTINGS_REAL_ESTATE_API') }/categories/${ id }`,
      body: data,
      json: true,
    })
  }

  patch(id, data, params) {
    return Promise.resolve(data)
  }

  remove(id, params) {
    return request({
      method: 'DELETE',
      uri: `${ nconf.get('SETTINGS_REAL_ESTATE_API') }/categories/${ id }`,
    })
  }
}

module.exports = function(){
  const app = this

  // Initialize our service with any options it requires
  app.use('/api/categories', new Service())
}

module.exports.Service = Service
