import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

/**
 * App container component
 */
function App() {
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
      <div>
        <Link to='/'>Home</Link>
        -
        <Link to='/about'>About</Link>
      </div>
      <div>
        { this.props.children }
      </div>
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.any.isRequired,
}

export default App
