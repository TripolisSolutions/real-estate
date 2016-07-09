import mobx, { action, observable, extendObservable } from 'mobx'
import log from 'loglevel'

import extend from 'lodash/fp/extend'
import cloneDeep from 'lodash/fp/cloneDeep'

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
