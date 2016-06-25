import { action, observable } from 'mobx'
import { feather } from './feather'

export interface IStore {
  ssrLocation: string
  text: string
}

export class Store {

  ssrLocation: string = undefined

  @observable text: string

  static fromJSON(json: IStore) {
    const store = new Store()

    store.ssrLocation = json.ssrLocation
    store.text = json.text

    return store
  }

  constructor(store?: IStore) {
    if (!store) { return }
    if (store.ssrLocation) {
      this.ssrLocation = store.ssrLocation
    }
  }

  @action changeText(newText: string) {
    this.fetchAboutData()
  }

  @action fetchAboutData() {
    return new Promise((resolve) => {
      feather().service('contact_requests').get(1).then( (res) => {
        this.text = res
        resolve()
      })
    })
  }

  toJSON(): IStore {
    return {
      text: this.text,
      ssrLocation: this.ssrLocation,
    }
  }
}

/**
 * Fetch data from components mapping "static fetchData()"
 * and injecting store, router params and query.
 * Used on the server-side. It returns a Promise.
 */
export function fetchData(store, components, params, query) {
  return Promise.all(components
    .map((component) => component.fetchData
      ? component.fetchData(store, params, query)
      : false));
}

/**
 * Fetch data from components when the router matches the borwser location.
 * It also prevent the first page to re-fetch data already fetched from the server.
 * Used on the client-side.
 */
export function fetchDataOnLocationMatch(history, routes, match, store: Store) {
  let ssrLocation = store.ssrLocation;
  history.listen((e) => {
    if (e.pathname !== ssrLocation) {
      match({ routes, location: e.pathname }, (error, redirect, props) => {
        if (props) {
          fetchData(store, props.components, props.params, props.location.query);
        }
      });
    }
    // enable subsequent fetches
    ssrLocation = undefined;
  });
}
