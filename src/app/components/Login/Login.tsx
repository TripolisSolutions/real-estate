import * as React from 'react'
import * as c from 'classnames'
import { translate, InjectedTranslateProps } from 'react-i18next'

import { Form } from 'formsy-react'
import * as FRC from 'formsy-react-components'
const { Input } = FRC

const s = require('./Login.less')

interface IFormData {
    username: string
    password: string
}

interface IProps extends InjectedTranslateProps {
    error: boolean
    submitForm(data: IFormData)
    onChange()
}

class Login extends React.Component<IProps, any> {
  public render() {
    const { t } = this.props

    return (
      <div className={ c('container', s.container) }>
        <div className='row'>
            <div className='col-md-offset-6 col-md-3'>
              <Form
                 className='vertical'
                 onSubmit={ this.props.submitForm }
                 onChange={ () => this.props.onChange() }
                >
                <div className={ s['form-login'] }>
                <h4>{ t('login') }</h4>
                <Input
                    labelClassName='hidden'
                    name='username'
                    type='text'
                    placeholder={ t('username') }
                />
                <br/>
                <Input
                    labelClassName='hidden'
                    name='password'
                    type='password'
                    placeholder={ t('password') }
                />
                <br/>
                {
                    this.props.error ? <div className={ s.error }>{ t('login_error') }</div> : undefined
                }
                <br/>
                <div className={ s.wrapper }>
                <span className='group-btn'>
                    <button type='submit' className='btn btn-primary btn-md' formNoValidate={ true }>
                        { t('login') } <i className='fa fa-sign-in'></i>
                    </button>
                </span>
                </div>
                </div>
              </Form>
            </div>
        </div>
    </div>
    )
  }
}

export default translate()(Login)
