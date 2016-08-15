import * as React from 'react'
import * as Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import Header from '../../components/Header/Header'

import { switchLanguage, switchCurrency } from '../../redux/modules/i18n/i18n'

/**
 * App container component
 */
function Admin(props) {
  const { t } = props
  return (
    <div>
      <Helmet
        title='Admin'
      />
      <Header items={[
        {
          url: '/admin',
          label: t('admin_menu_properties_list'),
        },
        {
          url: '/admin/properties/new',
          label: t('admin_menu_new_property'),
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

export default translate()(connect(
  state => state,
  dispatch => ({
    switchLanguage: () => dispatch(switchLanguage()),
    switchCurrency: () => dispatch(switchCurrency()),
  })
)(Admin))
