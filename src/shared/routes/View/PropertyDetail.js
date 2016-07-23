import React from 'react'
import { Col as BootstrapCol} from 'react-bootstrap'

import Block from '../components/Block/Block'
import Map from '../components/Map/Map'
import Input from '../components/Input/Input'
import TextArea from '../components/TextArea/TextArea'

const s = require('./PropertyDetail.less')

class PropertyDetail extends React.Component {
  render() {
    return (
      <div>
        <div className={ 'container' } >
          <Block title={ 'contact us' } bigger ={ true }>
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
        <Map />
      </div>
    )
  }
}

export default PropertyDetail
