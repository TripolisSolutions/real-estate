import * as React from 'react'
import { Col, Row} from 'react-bootstrap'

import Input from '../Input/Input'
import TextArea from '..//TextArea/TextArea'
import Button from '../Button/Button'

const s = require('./ContactInput.less')

export interface IContactForm {
  name: string
  gender: string
  email: string
  message: string
}

interface IProps {
  lock: boolean
  onSubmit(form: IContactForm)
}

function ContactInput(props: IProps) {
  return (
    <div>
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
      <Row>
        <Col md={2} className={ s.btn }>
          <Button text={ 'Send' }/>
        </Col>
      </Row>
    </div>
  )
}

export default ContactInput
