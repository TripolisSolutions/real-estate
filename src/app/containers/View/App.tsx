const appConfig = require('../../../../config/main');
import * as React from 'react'
import * as Helmet from 'react-helmet'
import { connect } from 'react-redux'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import { switchLanguage } from '../../redux/modules/i18n/i18n'

/**
 * App container component
 */
function App(props) {
  return (
    <div>
      <Helmet {...appConfig.app} {...appConfig.app.head}/>
      <Header items={[
        {
          url: '/',
          label: 'Home',
        },
        {
          url: '/about',
          label: 'About',
        },
        {
          url: '/contact',
          label: 'Contact',
        },
      ]}
        onSwitchLanguageClicked={ props.switchLanguage }
      />
      <div>
        { props.children }
      </div>
      <Footer />
    </div>
  )
}

export default connect(
  state => state,
  dispatch => ({
    switchLanguage: () => dispatch(switchLanguage()),
  })
)(App)
