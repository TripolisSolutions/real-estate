import * as feathers from 'feathers/client'
import * as feathersHooks from 'feathers-hooks'
import * as feathersSocketClient from 'feathers-socketio/client'
// import * as feathersAuth from 'feathers-authentication/client'
import * as socketIOClient from 'socket.io-client'

interface IFeather {
  service: (name: string) => any
} 

let instance: IFeather = undefined
// const storage: any = window ? window.localStorage : false;
const uri = 'http://localhost:8999';

export function feather(): IFeather {
  if (instance) { return instance }

  instance = feathers()
    .configure(feathersHooks())
    .configure(feathersSocketClient(socketIOClient(uri)))

  return instance;
}
