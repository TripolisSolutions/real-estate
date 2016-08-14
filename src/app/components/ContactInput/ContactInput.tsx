import * as React from 'react'
import { Col, Row} from 'react-bootstrap'
import * as _ from 'lodash'

import { translate, InjectedTranslateProps } from 'react-i18next'

import Input from '../Input/Input'
import TextArea from '../TextArea/TextArea'
import Button from '../Button/Button'

const s = require('./ContactInput.less')

export interface IContactForm {
  name: string
  gender: string
  email: string
  message: string
}

interface IProps extends InjectedTranslateProps {
  lock?: boolean
  onSubmit?(form: IContactForm)
}

class ContactInput extends React.Component<IProps, void> {

  private form: IContactForm

  private updateForm = (key, value) => {
    this.form[key] = value
  }

  private handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.form)
  }

  public render() {
    const { t } = this.props

    return (
      <div>
        <form action='' onSubmit={ this.handleSubmit }>
          <Row>
            <Col md={4}>
              <Input
                placeholder={ t('contact_name') }
                disabled={ this.props.lock }
                onChange={ _.debounce((value) => this.updateForm('name', value), 200) }
              />
              <Input
                placeholder={ t('contact_gender') }
                disabled={ this.props.lock }
                onChange={ _.debounce((value) => this.updateForm('gender', value), 200) }
              />
              <Input
                placeholder={ t('contact_email') }
                disabled={ this.props.lock }
                onChange={ _.debounce((value) => this.updateForm('email', value), 200) }
              />
            </Col>
            <Col md={8} className={ s.textarea  }>
              <TextArea
                placeholder={ t('contact_message') }
                disabled={ this.props.lock }
                onChange={ _.debounce((value) => this.updateForm('message', value), 200) }
              />
            </Col>
          </Row>
          <Row>
            <Col md={2} className={ s.btn }>
              <Button type='submit' text={ t('contact_send') } disabled={ this.props.lock }/>
            </Col>
          </Row>
        </form>
      </div>
    )
  }
}

export default translate()(ContactInput)
