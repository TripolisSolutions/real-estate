import * as React from 'react'
import { Col as BootstrapCol} from 'react-bootstrap'
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
          <div className={ 'row' } >
            <BootstrapCol md={4}>
              <Input placeholder={ 'your name' }/>
              <Input placeholder={ 'gender' }/>
              <Input placeholder={ 'gender' }/>
            </BootstrapCol>
            <BootstrapCol md={8} className={ s.textarea  }>
              <TextArea placeholder={ 'your name' } />
            </BootstrapCol>
          </div>
        </Block>
      </div>
      <LocationMap />
    </div>
  )
  }

export default translate()(Contact)
