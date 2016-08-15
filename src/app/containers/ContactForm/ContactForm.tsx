import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'

const ReactToastr = require('react-toastr')
const { ToastContainer } = ReactToastr

import ContactInput, { IContactForm } from '../../components/ContactInput/ContactInput'

interface IProps extends InjectedTranslateProps {
}

interface IState {
  isFetching: boolean
}

const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

class ContactForm extends React.Component<IProps, IState> {

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

    if (!form.email || !form.message) {
      this.refs.toast.warning(
        t('contact_request_form_validate_warn_body'),
        t('contact_request_form_validate_warn_title')
      )
      return
    }

    form.link = window.location.href

    this.setState({
      isFetching: true,
    })

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
          this.refs.toast.success(
            t('contact_request_success_body'),
            t('contact_request_success_title')
          )

          this.setState({
            isFetching: false,
          })
        } else {
          this.refs.toast.error(
            t('contact_request_error_body'),
            t('contact_request_error_title')
          )

          this.setState({
            isFetching: false,
          })
        }
      })
      .catch(err => {
        this.refs.toast.error(
          t('contact_request_error_body'),
          t('contact_request_error_title')
        )

        this.setState({
          isFetching: false,
        })
      })
  }

  public render() {
    return (
      <div>
        <ToastContainer ref='toast'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-right' />
        <ContactInput
          lock={ this.state.isFetching }
          onSubmit={ this.sendContactRequest }
        />
      </div>
    )
  }
}
export default translate()(ContactForm)
