import path from 'path';
import React from 'react';
import PropertyItem from '../components/PropertyItem/PropertyItem'

const s = require('./home.less');

class Home extends React.Component {
  render() {
    return (
      <div className={s.homeas}>
        <PropertyItem title="nice modern villa"/>
      </div>
    );
  }
}

export const homeUtils = {
  one: 1,
  two: 2
}; 

export default Home;s