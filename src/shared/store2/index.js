import { action, observable } from 'mobx'
import { feather } from '../feather'

import PropertiesStore from './properties'

export class Store {

  ssrLocation = undefined

  @observable text = ''

  @observable propertiesStore

  static fromJSON(json) {
    const store = new Store()

    store.ssrLocation = json.ssrLocation
    store.text = json.text

    if (json.propertiesStore) {
      store.propertiesStore = PropertiesStore.fromJSON(json.propertiesStore)
    } 

    return store
  }

  constructor(store) {
    if (!store) { return }
    if (store.ssrLocation) {
      this.ssrLocation = store.ssrLocation
    }

    this.propertiesStore = new PropertiesStore()
  }

  @action changeText() {
    this.fetchAboutData()
  }

  @action fetchAboutData() {
    return new Promise((resolve) => {
      feather().service('contact_requests').get(1)
        .then((res) => {
          this.text = res
          resolve()
        })
    })
  }

  toJSON() {
    return {
      text: this.text,
      ssrLocation: this.ssrLocation,
      propertiesStore: this.propertiesStore.toJSON(),
    }
  }
}


