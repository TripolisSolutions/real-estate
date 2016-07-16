import feathers from 'feathers/client'
import feathersHooks from 'feathers-hooks'
import feathersSocketClient from 'feathers-socketio/client'
// import * as feathersAuth from 'feathers-authentication/client'
import socketIOClient from 'socket.io-client'

let instance
let uri = 'http://localhost:8999'

if (typeof window !== 'undefined' && window.CONFIG.env === 'production') {
  uri = `${ location.protocol }//${ location.host }`
}

function feather() {
  if (instance) { return instance }

  instance = feathers()
    .configure(feathersHooks())
    .configure(feathersSocketClient(socketIOClient(uri)))

  return instance
}

export default function service(name) {
  return feather().service(name)
}
