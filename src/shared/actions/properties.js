import mobx, { action } from 'mobx'
import log from 'loglevel'

// mobx.useStrict(true)

export default (state, store) => {
    /**
     * @name properties
     * @class properties
     */
    return class properties {

        prepareForm() {
            return store.categories.fetchData()
        }

        find() {
            return this.request('/api/properties')
        }
    }
}
