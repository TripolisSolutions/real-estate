const { observable, asFlat, toJS } = require('mobx')

// Default state structure
let defaultState = observable({
    app: {
        title: 'Mobx-starter',
        hostname: '',
        statusCode: 200,
        ssrLocation: null,
    },
    language: 'vietnamese',
    salesTypes: asFlat([
      {
        value: 'buy',
        translationKey: 'saleTypes.buy'
      },
      {
        value: 'rent',
        translationKey: 'saleTypes.rent'
      },
    ]),
    directions: asFlat([
      {
        value: 'west',
        translationKey: 'directions.west'
      },
      {
        value: 'east',
        translationKey: 'directions.east'
      },
    ]),
    account: {
        username: null
    },
    todos: {
        loading: false,
        items: asFlat([])
    },
    categories: {
        loading: false,
        items: asFlat([])
    },
    isFetching: true
})

// Export an instance of our state
module.exports = global.isClient ? defaultState : toJS(defaultState)
