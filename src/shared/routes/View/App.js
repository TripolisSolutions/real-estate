import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'mobx-connect'

import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

/**
 * App container component
 */
function App(props) {
  return (
    <div>
      <Helmet
        htmlAttributes={{
          lang: 'en',
          amp: undefined
        }} // amp takes no value
        title='Real Estate'
        meta={ [
            { name: 'description', content: 'Real estate' },
        ] }
      />
      <Header />
      <div>
        { props.children }
      </div>
      <Footer />
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.any.isRequired,
}

export default connect(App)
