import * as React from 'react'
import * as Helmet from 'react-helmet'
import { connect } from 'react-redux'

import Header from '../../components/Header/Header'

import { switchLanguage, switchCurrency } from '../../redux/modules/i18n/i18n'

/**
 * App container component
 */
function Admin(props) {
  return (
    <div>
      <Helmet
        title='Admin'
      />
      <Header items={[
        {
          url: '/admin',
          label: 'Properties List',
        },
        {
          url: '/admin/properties/new',
          label: 'New Property',
        },
      ]}

        currentCurrency={ props.i18nData.currentCurrency }
        onSwitchLanguageClicked={ props.switchLanguage }
        onSwitchCurrencyClicked={ props.switchCurrency }
      />
      <div>
        { props.children }
      </div>
    </div>
  )
}

export default connect(
  state => state,
  dispatch => ({
    switchLanguage: () => dispatch(switchLanguage()),
    switchCurrency: () => dispatch(switchCurrency()),
  })
)(Admin)
