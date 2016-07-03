import React from 'react'

import { observer } from '../../../context'

@observer
class PropertyDetail extends React.Component {

  static fetchData(store, params) {
    if (params.id === 'new') {
      return store.propertiesStore.prepareNewProperty()
    }
    return store.propertiesStore.get(params.id)
  }

  render() {
    return (
      <div>
        {
          JSON.stringify(this.context.store.propertiesStore.propertyDetail)
        }
      </div>
    );
  }
}

export default PropertyDetail
