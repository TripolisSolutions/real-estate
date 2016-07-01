import React from 'react'

import { observer, IContext } from '../context'

@observer
class About extends React.Component {

  static fetchData(store) {
    return store.fetchAboutData();
  }

  context: IContext

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
