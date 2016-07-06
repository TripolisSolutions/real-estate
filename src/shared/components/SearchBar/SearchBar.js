import React from 'react'
import classnames from 'classnames'

import Block from '../Block/Block'
import Button from '../Button/Button'
import Dropdown from '../Dropdown/Dropdown'

const s = require('./SearchBar.less')

class SearchBar extends React.Component {
  render() {
    return (
      <Block title='I want to'>
        <div className={ s.container } >
          <div className={'row'}>
            <div className={'col-md-2'} >
              <Dropdown title='Buy'/>
            </div>
            <div className={'col-md-8'} >
              <Dropdown title='Buy'/>
            </div>
          </div>
          <div className={classnames('row', s.second)}>
            <div className={'col-md-2'} >
              <Dropdown title='Buy'/>
            </div>
            <div className={'col-md-1'} >
              <Dropdown title='Buy'/>
            </div>
            <div className={'col-md-1'} >
              <Dropdown title='Buy'/>
            </div>
            <div className={'col-md-1'} >
              <Dropdown title='Buy'/>
            </div>
            <div className={'col-md-1'} >
              <Dropdown title='Buy'/>
            </div>
            <div className={'col-md-1'} >
              <Dropdown title='Buy'/>
            </div>
            <div className={'col-md-1'} >
              <Dropdown title='Buy'/>
            </div>
          </div>
          <div className={ s.button }>
            <Button text='More Info' />
          </div>
        </div>
      </Block>
    )
  }
}

export default SearchBar
