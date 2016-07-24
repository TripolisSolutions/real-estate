import React from 'react'
import { Route, IndexRoute } from 'react-router'

import 'font-awesome/css/font-awesome.css'
import 'react-select/dist/react-select.css'
import 'alloyeditor/dist/alloy-editor/assets/alloy-editor-ocean.css'
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
        <Route>

            <Route path="/admin/" getComponent={requireAsync('Admin/Admin')}>
                <Route path='properties' getComponents={ requireAsync('Admin/ListProperties/ListProperties') } />
                <Route path='properties/new' getComponents={ requireAsync('Admin/NewProperty/NewProperty') } />
                <Route path='properties/:id' getComponents={ requireAsync('Admin/EditProperty/EditProperty') } />
            </Route>

            <Route path="/" getComponent={requireAsync('View/App')}>
                <IndexRoute getComponent={requireAsync('View/Home')}/>
                <Route path="about" getComponent={requireAsync('View/About')}/>
                <Route path="contact" getComponent={requireAsync('View/Contact')}/>
                <Route path="properties/:id" getComponent={requireAsync('View/PropertyDetail')}/>

                {/* User management */}
                <Route path="login" getComponents={requireAsync('Account/Login')}/>
                <Route path="logout" getComponents={requireAsync('Account/Logout')} onEnter={requireLogin}/>
                <Route path="register" getComponents={requireAsync('Account/Register')}/>
            </Route>

            <Route path="*" getComponent={requireAsync('NotFound')}/>
        </Route>
    )
}

export default createRoutes
