import mobx, { action, observable, extendObservable, computed } from 'mobx'
import log from 'loglevel'

import extend from 'lodash/fp/extend'
import cloneDeep from 'lodash/fp/cloneDeep'
import find from 'lodash/fp/find'
import isEmpty from 'lodash/fp/isEmpty'
import first from 'lodash/fp/first'

import { feather } from '../feather'

mobx.useStrict(true)

function translate(field, language) {
  return find({language: language})(field).text
}

const initState = {
  ssrLocation: null,

  categories: {
    data: []
  },

  adminPages: {
    selectedLanguage: 'vietnamese',
    create: {
      data: {
        name: [
          {
            language: 'vietnamese',
            text: 'Default VN'
          },
          {
            language: 'english',
            text: 'Default EN'
          },
        ],
        desc: [
          {
            language: 'vietnamese',
            text: 'Desc VN'
          },
          {
            language: 'english',
            text: 'Desc EN'
          },
        ],
        category_id: ''
      }
    },
    edit: {

    },
  },
}

class Store {
  constructor(state) {
    extendObservable(this, extend(cloneDeep(initState), state))
  }

  loadCategories() {
    return feather().service('/api/categories').find().then(
      (response) => {
        log.debug('loadCategories response:', response)
        this.setCategories(JSON.parse(response).docs)
      },
      (error) => {
        log.info('error: ', error)
      }
    )
  }

  @action setCategories(categories) {
    log.debug('setCategories: ', categories)
    this.categories.data = categories
  }

  @action loadAdminPropertyCreate() {
    log.debug('loadAdminPropertyCreate')
    this.adminPages.create.data = cloneDeep(initState.adminPages.create.data)

    if (this.categories.data.length === 0) {
      log.debug('loadCategories triggering')
      return this.loadCategories().then(
        () => {
          if (isEmpty(this.adminPages.create.data.category_id)) {
            this.updateAdminPropertyValue('category_id', first(this.categories.data).id)
          }
        }
      )
    }

    return null
  }

  @action changeAdminLanguage(newLanguage) {
    log.debug('store.changeAdminLanguage', newLanguage)
    this.adminPages.selectedLanguage = newLanguage
  }

  @action updateAdminPropertyValue(name, value) {
    log.debug('updateAdminPropertyValue', name, value)
    const data = this.adminPages.create.data
    const language = this.adminPages.selectedLanguage

    switch (name) {
      case 'name':
        find({language: language})(data.name).text = value
        return
      case 'desc':
        find({language: language})(data.desc).text = value
        return
      case 'category_id':
        data.category_id = value
        return
      default:
    }
  }

  @action saveProperty() {
    const data = this.adminPages.create.data
    log.info('saving property data: ', data)

    feather().service('/api/properties').create(data).then(
      (response) => {
        log.info('success: ', response)
      },
      (error) => {
        log.info('error: ', error)
      }
    )
  }

  @computed get adminFormCreateProperty() {
    const language = this.adminPages.selectedLanguage
    const data = this.adminPages.create.data

    const formData = {
      language: language,
      name: find({language: language})(data.name).text,
      desc: find({language: language})(data.desc).text,
      categories: this.categories.data.map( (cat) => ({ value: cat.id, label: translate(cat.name, language) })),
      categoryID: data.category_id,
    }

    log.debug('adminFormCreateProperty', formData)

    return formData
  }
}

export function NewStore(state) {
  log.debug('NewStore from state: ', state)
  return new Store(state)
  // return observable(extend({}, initState, actions, state))
}
