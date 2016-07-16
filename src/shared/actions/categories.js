import mobx, { action } from 'mobx'
import log from 'loglevel'

// mobx.useStrict(true)

export default (state, store) => {
    /**
     * @name categories
     * @class categories
     */
    return class categories {

        setItems(data) {
            state.categories.items = data
        }

        fetchData() {
            return this.service('/api/categories').find().then((response) => {
                const data = JSON.parse(response).docs
                log.debug('categories data: ', data)
                this.setItems(data)
            })
        }
    }
}
