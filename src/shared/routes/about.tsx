import * as React from 'react'
import Button from '../components/Button/Button'

import { observer, IContext } from '../context'
import { Store } from '../store'

@observer
class About extends React.Component<{}, {}> {

  context: IContext

  static fetchData(store: Store) {
    return store.fetchAboutData();
  }

  render() {
    return (
      <div>
        <p>I'm about { this.context.store.text } foos!</p>
        <Button>Hi there</Button>
        <button onClick={ () => this.context.store.fetchAboutData() }>
          Update
        </button>
      </div>
    );
  }
}

export default About




