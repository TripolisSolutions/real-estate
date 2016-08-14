const appConfig = require('../../../../config/main');
import * as React from 'react'
import * as Helmet from 'react-helmet'
import { connect } from 'react-redux'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import { switchLanguage, switchCurrency } from '../../redux/modules/i18n/i18n'
import { IState } from '../../redux/reducers'

interface IProps extends IState, React.Props<any> {
  switchLanguage: Redux.ActionCreator
  switchCurrency: Redux.ActionCreator
}

/**
 * App container component
 */
function App(props: IProps) {
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
          label: 'About Us',
        },
        {
          url: '/properties',
          label: 'Properties',
        },
        {
          url: '/contact',
          label: 'Contact',
        },
      ]}
        currentCurrency={ props.i18nData.currentCurrency }
        onSwitchLanguageClicked={ props.switchLanguage }
        onSwitchCurrencyClicked={ props.switchCurrency }
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
    switchCurrency: () => dispatch(switchCurrency()),
  })
)(App)
