import mobx, { action, computed } from 'mobx'
import log from 'loglevel'
import find from 'lodash/fp/find'

export default (state, store) => {
    /**
     * @name salesTypes
     * @class salesTypes
     */
    return class salesTypes {

         @computed get options() {
          return state.salesTypes.map( (item) => ({value: item.value, label: store.locale.t(item.translationKey)}))
        }
    }
}
