import mobx, { action } from 'mobx'
import log from 'loglevel'

// mobx.useStrict(true)

export default (state, store) => {
    /**
     * @name properties
     * @class properties
     */
    return class properties {

        setCategories(data) {
            state.categories.items.replace(data)
        }

        prepareForm() {
            return this.service('/api/categories').find().then((response) => {
                const data = JSON.parse(response).docs
                log.debug('categories data: ', data)
                this.setCategories = data
            })
        }

        find() {
            return this.request('/api/properties')
        }
    }
}
