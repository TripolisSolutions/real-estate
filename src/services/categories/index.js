import request from 'request-promise'
import nconf from 'nconf'
import urljoin from 'url-join'
import log from 'loglevel'

class Service {
  constructor() {
  }

  find(params) {
    const url = urljoin(nconf.get('SETTINGS_REAL_ESTATE_API'), '/categories')
    log.debug('categories.find url', url)
    return request(url)
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
