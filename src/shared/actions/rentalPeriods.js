import { computed } from 'mobx'

export default (state, store) => {
    /**
     * @name rentalPeriods
     * @class rentalPeriods
     */
    return class rentalPeriods {

         @computed get options() {
          return state.rentalPeriods.map( (item) => ({value: item.value, label: store.locale.t(item.translationKey)}))
        }
    }
}
