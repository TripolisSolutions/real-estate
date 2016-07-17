import { computed } from 'mobx'

export default (state, store) => {
    /**
     * @name directions
     * @class directions
     */
    return class directions {

         @computed get options() {
          return state.directions.map( (item) => ({value: item.value, label: store.locale.t(item.translationKey)}))
        }
    }
}
