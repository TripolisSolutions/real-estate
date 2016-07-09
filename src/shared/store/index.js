import mobx, { action, observable, extendObservable, computed } from 'mobx'
import log from 'loglevel'

import extend from 'lodash/fp/extend'
import cloneDeep from 'lodash/fp/cloneDeep'
import find from 'lodash/fp/find'

mobx.useStrict(true)

const initState = {
  ssrLocation: null,

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
        ]
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

  @action resetAdminCreatePropertyPage() {
    this.adminPages.create.data = cloneDeep(initState.adminPages.create.data)
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
      default:
    }
  }

  @computed get adminFormCreateProperty() {
    const language = this.adminPages.selectedLanguage
    const data = this.adminPages.create.data

    const formData = {
      language: language,
      name: find({language: language})(data.name).text
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
