import compose from 'lodash/fp/compose'
import compact from 'lodash/fp/compact'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'

/**
 * Execute fetchData methods for each component
 * Fetch data from components mapping "static fetchData()"
 * and injecting store, router params and query.
 * Used on the server-side. It returns a Promise.
 * @param renderProps
 * @param state - contains our state
 * @param store - contains our actions
 * @returns {Promise} - returns a promise
 */
export function fetchData(renderProps, state, store) {
    const params = renderProps.params
    const fetchDataMethods = compose(
        map('fetchData'),
        filter('fetchData'),
        compact
    )(renderProps.components)

    return Promise.all(fetchDataMethods.map(method => method({ state, store, params })));
}

/**
 * Fetch data from components when the router matches the borwser location.
 * It also prevent the first page to re-fetch data already fetched from the server.
 * Used on the client-side.
 */
export function fetchDataOnLocationMatch(history, routes, match, state, store) {
  let ssrLocation = store.ssrLocation
  history.listen((e) => {
    if (e.pathname !== ssrLocation) {
      match({ routes, location: e.pathname }, (error, redirect, props) => {
        if (props) {
          fetchData(props, state)
        }
      })
    }
    // enable subsequent fetches
    ssrLocation = undefined
  })
}
