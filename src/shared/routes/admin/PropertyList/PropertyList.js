import React from 'react'

import { observer } from '../../../context'

@observer
class PropertyList extends React.Component {

  static fetchData(store) {
    return store.propertiesStore.find()
  }

  render() {
    return (
      <div>
        {
          this.context.store.propertiesStore.properties.map((property) => {
            return (
              <div>
                {{ JSON.stringify(property) }}
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default PropertyList
