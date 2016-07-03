import React from 'react'
import PropertyItem from '../components/PropertyItem/PropertyItem'
import Block from '../components/Block/Block'

const s = require('./home.less')

class Home extends React.Component {
  render() {
    return (
      <div className={ 'container' }>
        <Block title='I want to'>
          <div className={'row'}>
            <div className={'col-md-2'} >
            1
            </div>
            <div className={'col-md-1'} >
            1
            </div>
            <div className={'col-md-1'} >
           1
            </div>
            <div className={'col-md-1'} >
            1
            </div>
            <div className={'col-md-1'} >
            1
            </div>
            <div className={'col-md-1'} >
            1
            </div>
            <div className={'col-md-1'} >
            1
            </div>
          </div>
        </Block>
        <Block title='Recently properties'>
          <div className={'row'}>
            <div className={'col-md-4'} >
              <PropertyItem title='nice modern villa' />
            </div>
            <div className={'col-md-4'} >
              <PropertyItem title='nice modern villa' />
            </div>
            <div className={'col-md-4'} >
              <PropertyItem title='nice modern villa' />
            </div>
            <div className={'col-md-4'} >
              <PropertyItem title='nice modern villa' />
            </div>
          </div>
        </Block>
      </div>
    )
  }
}

export default Home
