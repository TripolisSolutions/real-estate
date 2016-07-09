import React from 'react'

import { observer } from '../context'
import Map from '../components/Map/Map'

@observer
class About extends React.Component {

  static fetchData(store) {
    return store.fetchAboutData()
  }

  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

export default About
