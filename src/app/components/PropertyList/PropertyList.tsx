import * as React from 'react'
import { Col, Row} from 'react-bootstrap'

import Block from '../Block/Block'
import PropertyItem from '../PropertyItem/PropertyItem'

const s = require('./PropertyList.less')

class PropertyList extends React.Component<any, any> {
  public render() {
    return (
      <div className={'container'}>
        <Block title='Recently properties'>
          <Row>
            <Col md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </Col>
            <Col md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </Col>
            <Col md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </Col>
            <Col md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </Col>
            <Col md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </Col>
            <Col md={4} className={ s.item }>
              <PropertyItem title='nice modern villa' />
            </Col>
          </Row>
        </Block>
      </div>
    )
  }
}

export default PropertyList
