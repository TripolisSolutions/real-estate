import * as React from 'react'
import { Col, Row} from 'react-bootstrap'

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
            <Row>
              <Col md={ 2 }>
                <Dropdown title='Buy'/>
              </Col>
              <Col md={ 8 }>
                <Dropdown title='Buy'/>
              </Col>
            </Row>
            <Row className={s.second}>
              <Col md={ 2 }>
                <Dropdown title='Buy'/>
              </Col>
              <Col md={ 1 }>
                <Dropdown title='Buy'/>
              </Col>
              <Col md={ 1 }>
                <Dropdown title='Buy'/>
              </Col>
              <Col md={ 1 }>
                <Dropdown title='Buy'/>
              </Col>
              <Col md={ 1 }>
                <Dropdown title='Buy'/>
              </Col>
              <Col md={ 1 }>
                <Dropdown title='Buy'/>
              </Col>
              <Col md={ 1 }>
                <Dropdown title='Buy'/>
              </Col>
            </Row>
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
