import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'mobx-connect'

import Header from 'components/Header/Header'
/**
 * App container component
 */
function App(props) {
  return (
    <div>
      <Helmet
        title='Admin'
      />
      <Header items={[
        {
          url: '/admin/properties',
          label: 'Properties List'
        },
      ]}/>
      <div>
        { props.children }
      </div>
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.any.isRequired,
}

export default connect(App)
