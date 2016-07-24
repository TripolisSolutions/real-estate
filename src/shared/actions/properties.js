import mobx, { action, computed } from 'mobx'
import log from 'loglevel'
import find from 'lodash/fp/find'

export default (state, store) => {
    /**
     * @name properties
     * @class properties
     */
    return class properties {

        prepareForm() {
            return store.categories.fetchData()
        }

        async prepareFormEdit(id) {
            await store.categories.fetchData()

            const property = await store.properties.get(id)

            state.propertyEdit = JSON.parse(property).doc
            log.debug('state.propertyEdit', state.propertyEdit)
        }

        get(id) {
            return this.service('/api/properties/').get(id)
        }

        find() {
            return this.service('/api/properties').find()
        }

        create(property) {
            return this.service('/api/properties').create(property)
        }

        update(id, property) {
            return this.service('/api/properties').update(id, property)
        }

        @computed get formEdit() {
            function findText(language, field) {
                return find({language: language})(field).text
            }

            const data = state.propertyEdit

            if (!data) {
                return {}
            }

            return {
                nameVN: findText('vietnamese', data.name),
                nameEN: findText('english', data.name),
                descVN: findText('vietnamese', data.desc),
                descEN: findText('english', data.desc),
                addressVisible: data.address.visible,
                addressVN: findText('vietnamese', data.address.name),
                addressEN: findText('english', data.address.name),
            }
        }
    }
}
