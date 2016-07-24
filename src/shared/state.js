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
        translationKey: 'salesTypes.buy'
      },
      {
        value: 'rent',
        translationKey: 'salesTypes.rent'
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
    rentalPeriods: asFlat([
      {
        value: 'days',
        translationKey: 'rentalPeriods.days'
      },
      {
        value: 'months',
        translationKey: 'rentalPeriods.months'
      },
      {
        value: 'quarters',
        translationKey: 'rentalPeriods.quarters'
      },
      {
        value: 'years',
        translationKey: 'rentalPeriods.years'
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
    properties: [],
    propertyEdit: null,
    isFetching: true
})

// Export an instance of our state
module.exports = global.isClient ? defaultState : toJS(defaultState)
