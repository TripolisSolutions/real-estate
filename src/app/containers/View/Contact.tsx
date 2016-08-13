import * as React from 'react'
import { translate, InjectedTranslateProps } from 'react-i18next'

import Block from '../../components/Block/Block'
import LocationMap from '../../components/LocationMap/LocationMap'
import ContactInput from '../../components/ContactInput/ContactInput'

interface IProps extends InjectedTranslateProps {

}

const Contact = (props: IProps) => {
  return (
    <div>
      <div className={ 'container' } >
        <Block title={ props.t('contact_us') } bigger ={ true }>
          <ContactInput />
        </Block>
      </div>
      <LocationMap />
    </div>
  )
  }

export default translate()(Contact)
