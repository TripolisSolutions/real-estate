import { action, observable } from 'mobx'
import { feather } from '../feather'

export default class PropertiesStore {
  @observable properties = []
  @observable propertyDetail = undefined
  @observable isFetching = false

  static fromJSON(json) {
    const store = new PropertiesStore()

    store.properties = json.properties
    store.propertyDetail = json.propertyDetail

    return store
  }

  toJSON() {
    return {
      properties: this.properties,
      propertyDetail: this.propertyDetail,
    }
  }

  @action prepareNewProperty() {
    return new Promise((resolve) => {
      this.propertyDetail = {
        name: [
          {
            language: 'english',
            text: 'hello',
          }
        ]
      }
      resolve(this.propertyDetail)
    })
  }

  @action find() {
    return new Promise((resolve) => {
      feather().service('/api/properties').find()
        .then((res) => {
          this.properties = res
          resolve(res)
        })
    })
  }

  @action get(id) {
    return new Promise((resolve) => {
      feather().service('/api/properties').get(id)
        .then((res) => {
          this.propertyDetail = res
          resolve(res)
        })
    })
  }

  @action create() {
    return new Promise((resolve) => {
      feather().service('/api/properties').create()
        .then((res) => {
          this.properties = res
          resolve(res)
        })
    })
  }

  @action remove(id) {
    return new Promise((resolve) => {
      feather().service('/api/properties').remove(id)
        .then((res) => {
          resolve(res)
        })
    })
  }
}
