import service from '../helpers/service'
import properties from './properties'
import categories from './categories'

// All our actions are listed here
const actions = {
    properties,
    categories,
}

export default function(state) {

    const namespaces = Object.keys(actions)
    const classes = {}

    for (var i in namespaces) {
        const namespace = namespaces[i]
        const classObj = actions[namespace](state, classes)
        classes[namespace] = new classObj()
        classes[namespace].service = service
    }

    return classes
}
