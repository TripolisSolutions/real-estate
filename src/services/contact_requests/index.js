// 'use strict';

// const hooks = require('./hooks');

// class Service {
//   constructor(options) {
//     this.options = options || {};
//     this.count = 0
//   }

//   find(params) {
//     return Promise.resolve(['1', '2']);
//   }

//   get(id, params) {
//     return Promise.resolve(`the result ${ ++this.count }`);
//   }

//   create(data, params) {
//     if(Array.isArray(data)) {
//       return Promise.all(data.map(current => this.create(current)));
//     }

//     return Promise.resolve(data);
//   }

//   update(id, data, params) {
//     return Promise.resolve(data);
//   }

//   patch(id, data, params) {
//     return Promise.resolve(data);
//   }

//   remove(id, params) {
//     return Promise.resolve({ id });
//   }
// }

// module.exports = function(){
//   const app = this;

//   // Initialize our service with any options it requires
//   app.use('/contact_requests', new Service());

//   // Get our initialize service to that we can bind hooks
//   const contact_requestsService = app.service('/contact_requests');

//   // Set up our before hooks
//   contact_requestsService.before(hooks.before);

//   // Set up our after hooks
//   contact_requestsService.after(hooks.after);
// };

module.exports.Service = {}
