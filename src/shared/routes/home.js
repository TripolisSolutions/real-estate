import React from 'react'
import PropertyItem from '../components/PropertyItem/PropertyItem'

const s = require('./home.less')

class Home extends React.Component {
  render() {
    return (
      <div className={ s.container }>
        <PropertyItem title='nice modern villa' />
      </div>
    )
  }
}

export default Home
