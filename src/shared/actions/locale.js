import mobx, { action, computed } from 'mobx'
import log from 'loglevel'
import find from 'lodash/fp/find'

import i18n from '../i18n'

export default (state, store) => {
    /**
     * @name locale
     * @class locale
     */
    return class locale {

        @computed get localize() {
          const finder = find({language: state.language})
          return function(field) {
            return finder(field).text
          }
        }

        @computed get t() {
          const translate = i18n(state.language)
          return function(translationKey) {
            return translate[translationKey]
          }
        }

        @computed get languageCode() {
          switch (state.language) {
            case 'vietnamese': return 'vi'
            case 'english': return 'en'
            default: return 'en'
          }
        }
    }
}
