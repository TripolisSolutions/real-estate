import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'

const { connect } = require('react-redux')

import Block from '../../components/Block/Block'
import LocationMap from '../../components/LocationMap/LocationMap'
import ContactInput from '../../components/ContactInput/ContactInput'

interface IProps extends InjectedTranslateProps {
  sendContactRequest: Redux.ActionCreator
}

interface IState {
  isFetching: boolean
}

class Contact extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)

    this.state = {
      isFetching: false,
    }
  }

  public render() {
    const { props } = this

    return (
      <div>
        <div className={ 'container' } >
          <Block title={ props.t('contact_us') } bigger ={ true }>
            <ContactInput
              lock={ this.state.isFetching }
              onSubmit={ props.sendContactRequest() }
            />
          </Block>
        </div>
        <LocationMap />
      </div>
    )
  }
}
export default translate()(Contact)
