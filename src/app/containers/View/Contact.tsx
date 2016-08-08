import * as React from 'react'
import { Col, Row } from 'react-bootstrap'
import { translate, InjectedTranslateProps } from 'react-i18next'

import Block from '../../components/Block/Block'
import LocationMap from '../../components/LocationMap/LocationMap'
import Input from '../../components/Input/Input'
import TextArea from '../../components/TextArea/TextArea'

const s = require('./Contact.less')

interface IProps extends InjectedTranslateProps {

}

const Contact = (props: IProps) => {
  return (
    <div>
      <div className={ 'container' } >
        <Block title={ props.t('contact_us') } bigger ={ true }>
          <Row>
            <Col md={4}>
              <Input placeholder={ 'your name' }/>
              <Input placeholder={ 'gender' }/>
              <Input placeholder={ 'gender' }/>
            </Col>
            <Col md={8} className={ s.textarea  }>
              <TextArea placeholder={ 'your name' } />
            </Col>
          </Row>
        </Block>
      </div>
      <LocationMap />
    </div>
  )
  }

export default translate()(Contact)
