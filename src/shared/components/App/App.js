import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'mobx-connect'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
const s = require('./App.less')
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
      <Footer />
    </div>
  )
}

App.propTypes = {
  children: React.PropTypes.any.isRequired,
}

export default connect(App)

// import React from 'react'
// import { connect } from 'mobx-connect'

// const App = connect(function() {
//     return <div>
//         {this.props.children}
//     </div>
// })

// export default App
