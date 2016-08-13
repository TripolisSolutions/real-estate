import * as React from 'react'
import { Col, Row} from 'react-bootstrap'

import Block from '../Block/Block'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'
import Input from '../Input/Input'

const s = require('./SearchBar.less')

function SearchBar(props) {
  return (
     <div className={'container'}>
      <Block title='I want to'>
        <div className={ s.container } >
          <Row>
            <Col md={ 2 }>
              <Dropdown defaultValue='Buy' options={[{'value' : '1'},{'value' : '2'}]} />
            </Col>
            <Col md={ 8 }>
              <Input placeholder={ 'your name' }/>
            </Col>
          </Row>
          <Row className={s.second}>
            <Col md={ 2 }>
              <Dropdown defaultValue='All property types' options={[{'value' : '1'},{'value' : '2'}]}/>
            </Col>
            <Col md={ 1 }>
              <Dropdown defaultValue='Min bed' options={[{'value' : '1'},{'value' : '2'}]} />
            </Col>
            <Col md={ 1 }>
              <Dropdown defaultValue='Max bed' options={[{'value' : '1'},{'value' : '2'}]} />
            </Col>
            <Col md={ 1 }>
              <Dropdown defaultValue='Min price' options={[{'value' : '1'},{'value' : '2'}]} />
            </Col>
            <Col md={ 1 }>
              <Dropdown defaultValue='Max price' options={[{'value' : '1'},{'value' : '2'}]} />
            </Col>
            <Col md={ 1 }>
              <Dropdown defaultValue='District' options={[{'value' : '1'},{'value' : '2'}]} />
            </Col>
            <Col md={ 1 }>
              <Dropdown defaultValue='Square' options={[{'value' : '1'},{'value' : '2'}]} />
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
