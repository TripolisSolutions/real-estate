import React from 'react'
import Block from '../Block/Block'
import PropertyItem from '../PropertyItem/PropertyItem'

class PropertyList extends React.Component {
  render() {
    return (
      <Block title='Recently properties'>
        <div className={'row'}>
          <div className={'col-md-4'} >
            <PropertyItem title='nice modern villa' />
          </div>
          <div className={'col-md-4'} >
            <PropertyItem title='nice modern villa' />
          </div>
          <div className={'col-md-4'} >
            <PropertyItem title='nice modern villa' />
          </div>
          <div className={'col-md-4'} >
            <PropertyItem title='nice modern villa' />
          </div>
        </div>
      </Block>
    )
  }
}

export default PropertyList
