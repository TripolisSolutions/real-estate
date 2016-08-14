import * as React from 'react'
import { Col, Row} from 'react-bootstrap'

import { IProperty } from '../../redux/modules/properties/properties.model'
import { translateText } from '../../redux/models'

import Block from '../Block/Block'
import PropertyItem from '../PropertyItem/PropertyItem'

const s = require('./PropertyList.less')

interface IProps {
  langCode: string
  properties: IProperty[]
  title?: string
}

class PropertyList extends React.Component<IProps, any> {
  public render() {
    return (
      <div className={'container'}>
        <Block title={ this.props.title }>
          <Row>
            {
              this.props.properties.map((prop) => (
                <Col key={ prop.id } md={4} className={ s.item }>
                  <PropertyItem title={ translateText(prop.name, this.props.langCode) } />
                </Col>
              ))
            }
          </Row>
          { this.props.children }
        </Block>
      </div>
    )
  }
}

export default PropertyList
