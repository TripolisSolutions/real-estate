import mobx, { action, computed } from 'mobx'
import log from 'loglevel'
import find from 'lodash/fp/find'

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

        async prepareFormEdit(id) {
            await store.categories.fetchData()

            const property = await store.properties.get(id)

            state.propertyEdit = property
        }

        get(id) {
            return this.service(`/api/properties/${ id }`).get()
        }

        find() {
            return this.service('/api/properties').find()
        }

        create(property) {
            return this.service('/api/properties').create(property)
        }

        @computed get formEdit() {
            function findText(language, field) {
                return find({language: language})(field).text
            }

            if (!state.propertyEdit) {
                return null
            }

            const data = state.propertyEdit

            return {
                nameVN: findText('vietnamese', data.name),
                nameEN: findText('english', data.name),
                descVN: findText('vietnamese', data.desc),
                descEN: findText('english', data.desc),
            }
        }
    }
}
