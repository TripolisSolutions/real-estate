import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/Header/Header'
const s = require('./app.less')
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
        title='My Title'
        meta={ [
            { name: 'description', content: 'Helmet application' },
            { property: 'og:type', content: 'article' },
        ] }
      />
      <Header />
      <div>
        { props.children }
      </div>
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.any.isRequired,
}

export default App
