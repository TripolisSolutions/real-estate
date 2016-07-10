import mobx, { action, observable, extendObservable, computed } from 'mobx'
import log from 'loglevel'

import extend from 'lodash/fp/extend'
import cloneDeep from 'lodash/fp/cloneDeep'
import find from 'lodash/fp/find'
import isNull from 'lodash/fp/isNull'

import { feather } from '../feather'

mobx.useStrict(true)

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
        category_id: '5781215ace0450e84687b49e'
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

  @action loadCategories() {
    feather().service('/api/categories').find().then(
      (response) => {
        this.categories.data = response
      },
      (error) => {
        log.info('error: ', error)
      }
    )
  }

  @action loadAdminPropertyCreate() {
    this.adminPages.create.data = cloneDeep(initState.adminPages.create.data)

    if (isNull(this.categories.data.length)) {
      this.loadCategories()
    }
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
    }

    log.debug('adminFormCreateProperty', formData)

    return formData
  }
}

const actions = {
  adminPages: {
    create: {
      init: action('adminPages.create.init', function() {
        this.adminPages.create.data = cloneDeep(initState.adminPages.create.data)
      })
    },
  },
}

export function NewStore(state) {
  log.debug('NewStore from state: ', state)
  return new Store(state)
  // return observable(extend({}, initState, actions, state))
}
