import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App/App'

import 'font-awesome/css/font-awesome.css'
import 'react-select/dist/react-select.css'
import 'alloyeditor/dist/alloy-editor/assets/alloy-editor-moono.css'
import './styles/index.less'

/**
 * Asynchronously load a file
 * @param main {String} - Main component
 * @returns {Function}
 */
function requireAsync(main) {
    return function(location, next) {
        next(null, require('./routes/' + main).default)
    }
}

/**
 * Routes are defined here. They are loaded asynchronously.
 * Paths are relative to the "components" directory.
 * @param {Object}
 * @returns {Object}
 */
function createRoutes({ state }) {

    function requireLogin(nextState, replaceState, next) {
        //if (!state.user._id) replaceState(null, '/user/login')
        next()
    }

    return (
        <Route component={App}>

            <Route path="/">
                <IndexRoute getComponent={requireAsync('Home')}/>
                <Route path="about" getComponent={requireAsync('About')}/>
                <Route path="contact" getComponent={requireAsync('Contact')}/>
                <Route path="properties/:id" getComponent={requireAsync('PropertyDetail')}/>

                {/* User management */}
                <Route path="login" getComponents={requireAsync('Account/Login')}/>
                <Route path="logout" getComponents={requireAsync('Account/Logout')} onEnter={requireLogin}/>
                <Route path="register" getComponents={requireAsync('Account/Register')}/>

                { /* admin pages */ }
                <Route path='admin/properties/new' getComponents={ requireAsync('Admin/NewProperty/NewProperty') } />
            </Route>

            <Route path="*" getComponent={requireAsync('NotFound')}/>
        </Route>
    )
}

export default createRoutes
