import path from 'path';
import React from 'react';
import ItemList from '../components/ItemList/ItemList'
import Border from '../components/Border/Border'
import Button from '../components/Button/Button'

const s = require('./home.less');

class Home extends React.Component {
  render() {
    return (
      <div className={s.homeas}>
        <ItemList />
      </div>
    );
  }
}

export const homeUtils = {
  one: 1,
  two: 2
}; 

export default Home;s