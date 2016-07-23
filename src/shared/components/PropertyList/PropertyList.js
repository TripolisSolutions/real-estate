import React from 'react'
import { Col as BootstrapCol} from 'react-bootstrap'

import Block from '../Block/Block'
import PropertyItem from '../PropertyItem/PropertyItem'

const s = require('./PropertyList.less')

class PropertyList extends React.Component {
  render() {
    return (
      <div className={'container'}>
        <Block title='Recently properties'>
          <div className={'row'}>
            <BootstrapCol md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </BootstrapCol>
            <BootstrapCol md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </BootstrapCol>
            <BootstrapCol md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </BootstrapCol>
            <BootstrapCol md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </BootstrapCol>
            <BootstrapCol md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </BootstrapCol>
            <BootstrapCol md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </BootstrapCol>
          </div>
        </Block>
      </div>
    )
  }
}

export default PropertyList
