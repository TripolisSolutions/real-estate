import mobx, { action, computed } from 'mobx'
import log from 'loglevel'
import find from 'lodash/fp/find'

export default (state, store) => {
    /**
     * @name categories
     * @class categories
     */
    return class categories {

        setItems(data) {
            if (global.isClient) {
                state.categories.items.replace(data)
            } else {
                state.categories.items = data
            }
        }

        fetchData() {
            return this.service('/api/categories').find().then((response) => {
                const data = JSON.parse(response).docs
                log.debug('categories data: ', data)
                this.setItems(data)
            })
        }

         @computed get options() {
          return state.categories.items.map( (item) => ({value: item.id, label: store.locale.localize(item.name)}))
        }
    }
}
