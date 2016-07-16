import mobx, { action, computed } from 'mobx'
import log from 'loglevel'
import find from 'lodash/fp/find'

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
    }
}
