import * as React from 'react'
import * as classnames from 'classnames'
import { Col as BootstrapCol} from 'react-bootstrap'

import Block from '../Block/Block'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'

const s = require('./SearchBar.less')

class SearchBar extends React.Component<any, any> {
  render() {
    return (
      <div className={'container'}>
        <Block title='I want to'>
          <div className={ s.container } >
            <div className={'row'}>
              <BootstrapCol md={ 2 }>
                <Dropdown title='Buy'/>
              </BootstrapCol>
              <BootstrapCol md={ 8 }>
                <Dropdown title='Buy'/>
              </BootstrapCol>
            </div>
            <div className={classnames('row', s.second)}>
              <BootstrapCol md={ 2 }>
                <Dropdown title='Buy'/>
              </BootstrapCol>
              <BootstrapCol md={ 1 }>
                <Dropdown title='Buy'/>
              </BootstrapCol>
              <BootstrapCol md={ 1 }>
                <Dropdown title='Buy'/>
              </BootstrapCol>
              <BootstrapCol md={ 1 }>
                <Dropdown title='Buy'/>
              </BootstrapCol>
              <BootstrapCol md={ 1 }>
                <Dropdown title='Buy'/>
              </BootstrapCol>
              <BootstrapCol md={ 1 }>
                <Dropdown title='Buy'/>
              </BootstrapCol>
              <BootstrapCol md={ 1 }>
                <Dropdown title='Buy'/>
              </BootstrapCol>
            </div>
            <div className={ s.button }>
              <Button text='More Info' />
            </div>
          </div>
        </Block>
      </div> 
    )
  }
}

export default SearchBar
