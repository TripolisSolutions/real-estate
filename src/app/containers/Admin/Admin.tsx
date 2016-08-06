import * as React from 'react'
import * as Helmet from 'react-helmet'


import Header from '../../components/Header/Header'
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
          url: '/admin',
          label: 'Properties List',
        },
        {
          url: '/admin/properties/new',
          label: 'New Property',
        },
      ]}/>
      <div>
        { props.children }
      </div>
    </div>
  )
}

export default App
