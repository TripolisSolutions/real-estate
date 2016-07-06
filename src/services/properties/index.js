import request from 'request-promise'
import nconf from 'nconf'

import hooks from './hooks'

class Service {
  constructor() {
  }

  find(params) {
    return request(`${ nconf.get('SETTINGS_REAL_ESTATE_API') }/properties`)
  }

  get(id, params) {
    return request(`${ nconf.get('SETTINGS_REAL_ESTATE_API') }/properties/${ id }`)
  }

  create(data, params) {
    return request({
      method: 'POST',
      uri: `${ nconf.get('SETTINGS_REAL_ESTATE_API') }/properties`,
      body: data,
      json: true,
    })
  }

  update(id, data, params) {
    return request({
      method: 'PUT',
      uri: `${ nconf.get('SETTINGS_REAL_ESTATE_API') }/properties/${ id }`,
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
      uri: `${ nconf.get('SETTINGS_REAL_ESTATE_API') }/properties/${ id }`,
    })
  }
}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/api/properties', new Service())

  // Get our initialize service to that we can bind hooks
  const propertiesService = app.service('/api/properties')

  // Set up our before hooks
  propertiesService.before(hooks.before)

  // Set up our after hooks
  propertiesService.after(hooks.after)
};

module.exports.Service = Service
