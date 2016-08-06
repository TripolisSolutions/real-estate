const appConfig = require('../../../../config/main');
import * as React from 'react'
import * as Helmet from 'react-helmet'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

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
      ]}/>
      <div>
        { props.children }
      </div>
      <Footer />
    </div>
  )
}

export default App
