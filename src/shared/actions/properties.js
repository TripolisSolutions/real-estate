import mobx, { action, computed } from 'mobx'
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
            return this.service('/api/properties').find()
        }

        create(property) {
            return this.service('/api/properties').create(property)
        }
    }
}
