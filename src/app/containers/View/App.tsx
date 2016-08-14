const appConfig = require('../../../../config/main');
import * as React from 'react'
import * as Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { translate, InjectedTranslateProps } from 'react-i18next'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import { switchLanguage, switchCurrency } from '../../redux/modules/i18n/i18n'
import { IState } from '../../redux/reducers'

interface IProps extends IState, React.Props<any>, InjectedTranslateProps {
  switchLanguage: Redux.ActionCreator
  switchCurrency: Redux.ActionCreator
}

/**
 * App container component
 */
function App(props: IProps) {
  const { t } = props

  return (
    <div>
      <Helmet {...appConfig.app} {...appConfig.app.head}/>
      <Header items={[
        {
          url: '/',
          label: t('menu_home'),
        },
        {
          url: '/about',
          label: t('menu_about_us'),
        },
        {
          url: '/properties',
          label: t('menu_properties_list'),
        },
        {
          url: '/contact',
          label: t('menu_contact_us'),
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

export default translate()(connect(
  state => state,
  dispatch => ({
    switchLanguage: () => dispatch(switchLanguage()),
    switchCurrency: () => dispatch(switchCurrency()),
  })
)(App))
