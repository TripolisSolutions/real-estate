import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'

const ReactToastr = require('react-toastr')
const { ToastContainer } = ReactToastr

import Block from '../../components/Block/Block'
import LocationMap from '../../components/LocationMap/LocationMap'
import ContactForm from '../ContactForm/ContactForm'

import configs from '../../configs'

interface IProps extends InjectedTranslateProps {
}

interface IState {
}

const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

class Contact extends React.Component<IProps, IState> {
  public render() {
    const { props } = this

    const { googleMapAPIKey } = configs()

    return (
      <div>
        <ToastContainer ref='toast'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-right' />
        <div className={ 'container' } >
          <Block title={ props.t('contact_us') } bigger ={ true }>
            <ContactForm/>
          </Block>
        </div>
        <LocationMap
          googleMapAPIKey={ googleMapAPIKey }
        />
      </div>
    )
  }
}
export default translate()(Contact)
