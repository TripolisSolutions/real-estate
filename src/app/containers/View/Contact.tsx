import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'

const ReactToastr = require('react-toastr')
const { ToastContainer } = ReactToastr

import Block from '../../components/Block/Block'
import LocationMap from '../../components/LocationMap/LocationMap'
import ContactInput, { IContactForm } from '../../components/ContactInput/ContactInput'

interface IProps extends InjectedTranslateProps {
}

interface IState {
  isFetching: boolean
}

const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

class Contact extends React.Component<IProps, IState> {

  public refs: {
    [key: string]: any
    toast: any
  }

  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
    }
  }

  private sendContactRequest = (form: IContactForm) => {
    const { t } = this.props

    fetch('/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(res => {
              this.refs.toast.success(
                t('contact_request_success_title'),
                t('contact_request_success_body')
              )
            })
        } else {
          return res.json()
            .then(res => {
              this.refs.toast.error(
                t('contact_request_error_title'),
                t('contact_request_error_body')
              )
            })
        }
      })
      .catch(err => {
        this.refs.toast.error(
          t('contact_request_error_title'),
          t('contact_request_error_body')
        )
      })
  }

  public render() {
    const { props } = this

    return (
      <div>
        <ToastContainer ref='toast'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-right' />
        <div className={ 'container' } >
          <Block title={ props.t('contact_us') } bigger ={ true }>
            <ContactInput
              lock={ this.state.isFetching }
              onSubmit={ this.sendContactRequest }
            />
          </Block>
        </div>
        <LocationMap />
      </div>
    )
  }
}
export default translate()(Contact)
