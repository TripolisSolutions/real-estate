import React from 'react'
import Block from '../Block/Block'
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
          <div className={'row'}>
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
        </div>
      </Block>
    )
  }
}

export default SearchBar
