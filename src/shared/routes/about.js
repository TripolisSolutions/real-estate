import React from 'react'

import { observer, IContext } from '../context'
import { Store } from '../store'

@observer
class About extends React.Component {

  context: IContext

  static fetchData(store) {
    return store.fetchAboutData();
  }

  render() {
    return (
      <div>
        <p>I'm about { this.context.store.text } foos!</p>
        <button onClick={ () => this.context.store.fetchAboutData() }>
          Update
        </button>
      </div>
    );
  }
}

export default About




