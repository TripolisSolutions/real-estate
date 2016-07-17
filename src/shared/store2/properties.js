import { action, observable } from 'mobx'
import _ from 'lodash'
import { feather } from '../feather'

class Property {
  @observable id = ''
  @observable name = ''
  @observable thumbnail = null
  @observable galleryImages = []
  @observable desc = ''

  constructor(json) {
    if (!json) return

    const fields = _.pick(json, 'id', 'name', 'desc', 'thumbnail')
    _.assign(this, fields)

    this.galleryImages = json.gallery_images
  }

  toJSON() {
    return {
      name: this.name,
      desc: this.desc,
    }
  }
}

class AdminState {
  @observable selectedLanguage = 'vietnamese' // or english
  
}

export default class PropertiesStore {
  @observable properties = []
  @observable propertyDetail = undefined
  @observable isFetching = false
  @observable language = 'vietnamese'

  @observable adminState = new AdminState()

  static fromJSON(json) {
    const store = new PropertiesStore()

    store.properties = json.properties
    store.propertyDetail = json.propertyDetail

    return store
  }

  toJSON() {
    return {
      properties: this.properties,
      propertyDetail: this.propertyDetail.toJSON(),
    }
  }

  @action prepareNewProperty() {
    return new Promise((resolve) => {
      const prop = new Property()

      prop.name = [
        {
          language: 'vietnamese',
          text: 'Default VN'
        },
        {
          language: 'english',
          text: 'Default EN'
        },
      ]

      props.desc = [
        {
          language: 'vietnamese',
          text: ''
        },
        {
          language: 'english',
          text: ''
        },
      ]

      this.propertyDetail = prop
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
