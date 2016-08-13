import * as React from 'react'
import { Col, Row} from 'react-bootstrap'

import Block from '../Block/Block'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'

const s = require('./SearchBar.less')

function SearchBar(props) {
  return (
     <div className={'container'}>
      <Block title='I want to'>
        <div className={ s.container } >
          <Row>
            <Col md={ 2 }>
              <Dropdown defaultValue='Buy'/>
            </Col>
            <Col md={ 8 }>
              <Dropdown defaultValue='Buy'/>
            </Col>
          </Row>
          <Row className={s.second}>
            <Col md={ 2 }>
              <Dropdown defaultValue='All property types'/>
            </Col>
            <Col md={ 1 }>
              <Dropdown defaultValue='Min bed'/>
            </Col>
            <Col md={ 1 }>
              <Dropdown defaultValue='Max bed'/>
            </Col>
            <Col md={ 1 }>
              <Dropdown defaultValue='Min price'/>
            </Col>
            <Col md={ 1 }>
              <Dropdown defaultValue='Max price'/>
            </Col>
            <Col md={ 1 }>
              <Dropdown defaultValue='District'/>
            </Col>
            <Col md={ 1 }>
              <Dropdown dault='Square'/>
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

export default SearchBar
